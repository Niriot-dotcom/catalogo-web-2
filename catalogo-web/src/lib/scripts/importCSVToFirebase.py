''' COMMAND '''
'''

python src/lib/scripts/importCSVToFirebase.py

'''

''' LIBRARIES '''
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import numpy as np
import json
import csv
import re

''' CLASSES '''
class NumpyArrayEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, np.integer):
            return int(obj)
        elif isinstance(obj, np.floating):
            return float(obj)
        elif isinstance(obj, np.ndarray):
            return obj.tolist()
        return json.JSONEncoder.default(self, obj)

''' CREDENTIALS '''
cred = credentials.Certificate('/Users/patylopez/Library/CloudStorage/GoogleDrive-patylopezdev@gmail.com/My Drive/SOFTWARE_PROJECTS/VIANNEY/CAT WEB - INVIERNO 24-25/000 keys/mx-vianney-001-firebase-adminsdk-q5ydi-84d2becdf3.json')
app = firebase_admin.initialize_app(cred)
db = firestore.client()

''' CONSTANTS '''
COLLECTION_NAME = "testPages"
OUT_JSON = 'jsonInvierno.json'
CSV_DB = './src/lib/scripts/Invierno Completed F3.csv'

csv_filepath = '/Users/patylopez/Library/CloudStorage/GoogleDrive-patylopezdev@gmail.com/My Drive/SOFTWARE_PROJECTS/VIANNEY/CAT WEB - INVIERNO 24-25/000 docs/out.csv'
ARRAY_ROWS = [
    'complSheets',
    'complCurtains',
    'complPillowCovers',
    'complCushions',
    'complDecoration',
    # 'keywords',
    # 'pageCopys',
    # 'pageDescriptions',
    # 'pageProducts',
    'pageIcons',
    'pageVideos',
    # 'pageImages',
    'pageResources',
    # 'pageProductsImages',
    # 'pageRelatedProducts',
]

# Read data
# users_ref = db.collection(COLLECTION_NAME)
# docs = users_ref.stream()

# for doc in docs:
#     print(f"{doc.id} => {doc.to_dict()}")

''' FIREBASE FUNCTIONS '''
def delete_collection(coll_name, batch_size):
    coll_ref = db.collection(coll_name)
    docs = coll_ref.list_documents(page_size=batch_size)
    deleted = 0

    for doc in docs:
        # print(f"Deleting doc {doc.id} => {doc.get().to_dict()}")
        doc.delete()
        deleted = deleted + 1

    if deleted >= batch_size:
        return delete_collection(coll_ref, batch_size)
def json_to_firebase(json_object, firebase_collection_name):
    collection = db.collection(firebase_collection_name)
    for obj in json_object:
        doc_ref = collection.document()
        doc_ref.set(obj)

''' FUNCTIONS '''
def parse_csv_to_json(csv_filepath, json_filepath="", count_stop=-1):
    json_array = []
    with open(csv_filepath, mode='r') as csv_file:
        csv_reader = csv.DictReader(csv_file)
        line_count = 0
        for row in csv_reader:
            try: 
                # custom stop
                if line_count == count_stop: break

                # avoid columns
                if line_count == 0:
                    line_count += 1

                # process rows
                if row['productOrder'] != "":
                    row['productOrder'] = int(row['productOrder'] if row['productOrder'].isdigit() else -1)
                if row['pageCopys'] != "":
                    row['pageCopys'] = row['pageCopys'].replace(" '", ", '").strip('[]').replace("'", "").split(', ')
                for field in ARRAY_ROWS:
                    try:
                        row[field] = row[field].replace(" '", ", '").strip('[]').replace("'", "").split(', ')
                    except:
                        print("An exception occurred in ", field)

                # add row to array
                json_array.append(row)
                
                line_count += 1
            except:
                print("An exception occurred in ROW", row)

    # write file is json_filepath is provided
    if json_filepath != "":
        with open(json_filepath, 'w', encoding='utf-8') as jsonf: 
            json_string = json.dumps(json_array, cls=NumpyArrayEncoder, indent=4, ensure_ascii=False)
            jsonf.write(json_string)
    print('Done.\n==> Total new elements:', len(json_array))
    return json_array





''' MAIN '''
# delete_collection(COLLECTION_NAME, 5)
json_obj = parse_csv_to_json(CSV_DB, OUT_JSON)
json_to_firebase(json_obj, COLLECTION_NAME)
