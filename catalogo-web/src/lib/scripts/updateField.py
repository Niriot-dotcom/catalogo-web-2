''' COMMAND '''
'''

python src/lib/scripts/updateField.py

'''

''' LIBRARIES '''
import pandas as pd
import numpy as np
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from google.cloud.firestore_v1.base_query import FieldFilter
import json
import csv

CAT_WEB_FOLDER = '/Users/patylopez/Library/CloudStorage/GoogleDrive-patylopezdev@gmail.com/My Drive/SOFTWARE_PROJECTS/VIANNEY/CAT WEB - INVIERNO 24-25/'

''' CREDENTIALS '''
cred = credentials.Certificate(f'{CAT_WEB_FOLDER}/000 keys/mx-vianney-001-firebase-adminsdk-q5ydi-84d2becdf3.json')

''' CONSTANTS '''
COLLECTION_NAME = "testPages"
CSV_TO_MODIFY = f'{CAT_WEB_FOLDER}/000 docs/Templates CAT WEB BD Invierno 2024 - 2025.csv'
WRITE_CSV = f'{CAT_WEB_FOLDER}/000 docs/Templates CAT WEB BD Invierno 2024 - 2025 Modified.csv'
CSV_DB = './src/lib/scripts/Invierno Completed F2.csv'
ARRAY_ROWS = [
    'complSheets',
    'complCurtains',
    'complPillowCovers',
    'complCushions',
    'complDecoration',
    'keywords',
    'pageCopys',
    # 'pageDescriptions',
    # 'pageProducts',
    'pageIcons',
    'pageVideos',
    # 'pageImages',
    'pageResources',
    # 'pageProductsImages',
    # 'pageRelatedProducts',
]

class NumpyArrayEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, np.integer):
            return int(obj)
        elif isinstance(obj, np.floating):
            return float(obj)
        elif isinstance(obj, np.ndarray):
            return obj.tolist()
        return json.JSONEncoder.default(self, obj)

''' FUNCTIONS '''
def write_csv_file(filename, json_data):
    df = pd.DataFrame(json_data)
    df.to_csv(filename, index=False)

def update_templates(csv_filepath, limit=-1):
    with open(csv_filepath, mode='r') as csv_file:
        csv_reader = csv.DictReader(csv_file)
        line_count = 0

        updated_data = []
        for row in csv_reader:
            if line_count == limit:
                break

            ''' process '''
            # if productName is empty, then row is empty
            if 'productName' in row and row['productName'] in ['', 'productName', 'Nombre Producto']:
                continue

            # si el SKU es valido, se comienzan a llenar los campos
            if 'SKU' in row and row['SKU'] != '':
                row["pageTemplate"] = 'Cobertor'

            line_count += 1
            updated_data.append(row)
            
        print(f'\n\nProcessed {line_count} lines.')
        return updated_data

def update_fields(fields, csv_filepath, limit=-1):
    with open(csv_filepath, mode='r') as csv_file:
        csv_reader = csv.DictReader(csv_file)
        line_count = 0

        updated_data = []
        for row in csv_reader:
            if line_count == limit:
                break

            ''' process '''
            # if productName is empty, then row is empty
            if 'productName' in row and row['productName'] in ['', 'productName', 'Nombre Producto']:
                continue

            # si el SKU es valido, se comienzan a llenar los campos
            # if 'SKU' in row and row['SKU'] != '':
            #     row["pageTemplate"] = 'Cobertor'
            #     for field in fields:
            #         row[field] = 0

            line_count += 1
            updated_data.append(row)
            
        print(f'\n\nProcessed {line_count} lines.')
        return updated_data

def update_collection_from_json(json_object, firebase_collection_name):
    firebase_admin.initialize_app(cred)
    db = firestore.client()
    collection = db.collection(firebase_collection_name)
    for obj in json_object:
        docs = collection.where(
            filter=FieldFilter("SKU", "==", obj["SKU"])
        ).get()
        for doc in docs:
            doc_ref = collection.document(doc.id)
            doc_ref.update({
                "pageTemplate": obj["pageTemplate"]
            })

def update_collection_rows(fields, json_object, firebase_collection_name):
    firebase_admin.initialize_app(cred)
    db = firestore.client()
    collection = db.collection(firebase_collection_name)
    for obj in json_object:
        docs = collection.where(
            filter=FieldFilter("SKU", "==", obj["SKU"])
        ).get()
        for doc in docs:
            doc_ref = collection.document(doc.id)
            
            for field in fields:
                doc_ref.update({ field: obj[field] })

def get_numeric_array(arr: str, resources=False, keyword='', sku='', pageTemplate=''):
    # arr can be:
    #    an empty string (''),
    #    ['12345' '12345']
    #    [12345, 12345]
    #    12345,12345
    if arr == '' or arr == '[]':
        arr = []
    elif "'" in arr and '[' in arr:
        arr = arr.replace(" '", ", '").strip('[]').replace("'", "").split(', ')
    elif not "'" in arr and '[' in arr and ','in arr:
        arr = arr.strip('[]').split(', ')
    elif not "'" in arr and '[' in arr and ','in arr:
        arr = arr.split(',')
    else:
        raise Exception('get_numeric_array ERROR ==> Invalid input string arr:\ntype: %s\nstring (arr): %s' % (type(arr), arr))

    return arr

def parse_csv_to_json(csv_filepath, json_filepath="", count_stop=-1):
    json_array = []
    with open(csv_filepath, mode='r') as csv_file:
        csv_reader = csv.DictReader(csv_file)
        line_count = 0
        for row in csv_reader:
            # custom stop
            if line_count == count_stop: break

            # avoid columns
            if line_count == 0:
                line_count += 1

            # process rows
            if row['productOrder'] != "":
                row['productOrder'] = int(row['productOrder'] if row['productOrder'].isdigit() else -1)
            for field in ARRAY_ROWS:
                try:
                    # row[field] = row[field].strip('[]').replace("'", "").split()
                    row[field] = get_numeric_array(row[field])
                except:
                    print("An exception occurred in ", field)

            # add row to array
            json_array.append(row)
            
            line_count += 1

    # write file is json_filepath is provided
    if json_filepath != "":
        with open(json_filepath, 'w', encoding='utf-8') as jsonf: 
            json_string = json.dumps(json_array, cls=NumpyArrayEncoder, indent=4, ensure_ascii=False)
            jsonf.write(json_string)
    print('Done.\n==> Total new elements:', len(json_array))
    return json_array



''' MAIN '''
# new_data = update_templates(CSV_TO_MODIFY)
# write_csv_file(WRITE_CSV, new_data)

# json_obj = parse_csv_to_json(WRITE_CSV, 'jsonDeleteSoon.json')
# update_collection_from_json(json_obj, COLLECTION_NAME)

''' MULTIPLE FIELDS TO UPDATE '''
FIELDS_TO_UPDATE = [
    # 'pageResources',
    # 'pageTitle',
    'pageCopys'
]
json_obj = parse_csv_to_json('/Users/patylopez/Library/CloudStorage/GoogleDrive-patylopezdev@gmail.com/My Drive/SOFTWARE_PROJECTS/VIANNEY/CAT WEB - INVIERNO 24-25/000 docs/Templates CAT WEB BD Invierno 2024 - 2025.csv', 'jsonDeleteSoon.json')
update_collection_rows(FIELDS_TO_UPDATE, json_obj, COLLECTION_NAME)
