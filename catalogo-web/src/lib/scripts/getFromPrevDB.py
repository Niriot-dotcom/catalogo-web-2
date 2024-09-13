''' COMMAND '''
'''
python src/lib/scripts/getFromPrevDB.py
'''

''' LIBRARIES '''
import pandas as pd
import numpy as np
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from google.cloud.firestore_v1.base_query import FieldFilter
from tempfile import NamedTemporaryFile
import shutil
import csv

VIANNEY_FOLDER = '/Users/patylopez/Library/CloudStorage/GoogleDrive-patylopezdev@gmail.com/My Drive/SOFTWARE_PROJECTS/VIANNEY'

''' CREDENTIALS '''
cred = credentials.Certificate(f'{VIANNEY_FOLDER}/000 KEYS/mx-vianney-001-firebase-adminsdk-q5ydi-84d2becdf3.json')

DB_ROWS = [
    "SKU",
    "productType",
    "productName",
    "status",
    "productSection",
    "productOrder",
    "pageTemplate",
    "pageResources",
    "pageTitle",
    "complSheets",
    "complCurtains",
    "complPillowCovers",
    "complCushions",
    "complDecoration",
    "pageCopys",
    "pageKeywords",
    "pageVideos",
    "pageStatus",
    "pageRelatedProducts",
    "pageIcons",
    "pageSubtitle",
    "pageSeoTitle",
    "pageSeoDescription",
]

TEXT_ROWS = [
    # "SKU",
    # "productType",
    # "productName",
    # "status",
    # "productSection",
    # "productOrder",
    # "pageTemplate",
    "pageTitle",
    "pageStatus",
    "pageSubtitle",
    "pageSeoTitle",
    "pageSeoDescription",
]

ARRAY_ROWS = [
    "pageResources",
    # complSheets",
    # complCurtains",
    # complPillowCovers",
    # complCushions",
    # complDecoration",
    "pageCopys",
    "pageKeywords",
    # pageVideos",
    "pageRelatedProducts",
    "pageIcons",
]
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
    elif type(arr) is list:
        return arr
    else:
        # raise Exception('get_numeric_array ERROR ==> Invalid input string arr:\ntype: %s\nstring (arr): %s' % (type(arr), arr))
        arr = arr.split()

    return arr

''' CONSTANTS '''
REF_COLLECTION = "biasiPages"
ACTUAL_CSV = f'{VIANNEY_FOLDER}/00 DOCS/CAT WEB DB.csv'
# BIASI
def BiasiPrevDB(LIMIT=-1):
    firebase_admin.initialize_app(cred)
    db = firestore.client()
    docs = db.collection(REF_COLLECTION).stream()

    # dict from collection docs
    fb_dict = {}
    for doc in docs:
        obj = doc.to_dict()
        if 'pageProducts' in obj and obj['pageProducts'] and obj['pageProducts'] is not None:
            fb_dict[get_numeric_array(obj['pageProducts'])[0]] = obj

    # 
    tempfile = NamedTemporaryFile(mode='w', delete=False)
    with open(ACTUAL_CSV, mode='r') as csv_file, tempfile:
        csv_reader = csv.DictReader(csv_file, fieldnames=DB_ROWS)
        writer = csv.DictWriter(tempfile, fieldnames=DB_ROWS)

        line_count = 0
        for row in csv_reader:
            if line_count == LIMIT:
                break
            if 'status' in row and row['status'] == "NVO":
                writer.writerow(row)
                continue
                
            SKU = row['SKU']
            if SKU not in fb_dict:
                print(f'SKU not found in {REF_COLLECTION}', SKU)
                writer.writerow(row)
                continue

            if fb_dict[SKU]['pageTemplate'] == "portadilla":
                writer.writerow(row)
                continue

            for field in ARRAY_ROWS:
                if type(fb_dict[SKU][field]) is list:
                    row[field] = fb_dict[SKU][field]
                else:
                    row[field] = fb_dict[SKU][field].split(',')
            for field in TEXT_ROWS:
                row[field] = fb_dict[SKU][field]

            writer.writerow(row)
    shutil.move(tempfile.name, ACTUAL_CSV)

BiasiPrevDB()