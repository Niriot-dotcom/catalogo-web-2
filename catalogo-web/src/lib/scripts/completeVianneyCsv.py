'''
==> RUN COMMAND

python3 src/lib/scripts/completeVianneyCsv.py

'''

from firebase_admin import credentials
from firebase_admin import firestore
from json import JSONEncoder
import firebase_admin
import numpy as np
import pandas as pd
import csv
import json

''' CREDENTIALS '''
cred = credentials.Certificate('/Users/Paty.Lopez/Vianney/keys/mx-vianney-001-firebase-adminsdk-q5ydi-71a4661d43.json')
app = firebase_admin.initialize_app(cred)
db = firestore.client()

''' CONSTANTS '''
class NumpyArrayEncoder(JSONEncoder):
    def default(self, obj):
        if isinstance(obj, np.ndarray):
            return obj.tolist()
        return JSONEncoder.default(self, obj)

csv_file = '/Users/Paty.Lopez/Documents/GitHub/catalogo-web/catalogo-web/src/lib/scripts/out_keywords.csv'
list_cols = [
    "productName", "SKU", "productType", "productSection", "productOrder",
    "complSheets", "complCurtains", "complPillowCovers", "complCushions", "complDecoration",
    "brandId", "categoryId", "departmentId", "keywords", "name",
    "pageTemplate",
    "pageTitle",
    "pageSubtitle",
    "pageCopys",
    "pageResources",
    "pageKeywords",
    "pageVideos",
    "pageStatus",
    "pageProducts",
    "pageRelatedProducts",
    "pageIcons",
    "pageSeoTitle",
    "pageSeoDescription",
]
vianney_words_remove = [
    'Edredón Nuut ',
    'Edredón Novo ',
    'Edredón Voga ',
    'Edredón ',
    'Funda De Duvet ',
    'Colcha ',
    'Relleno de ',
    'Frazada Austral ',
    'Frazada Everest ',
    'Cobertor Ligero ',
    # 'Protector de Almohada ',
    'Protector De Colchón ',
    'Funda De Almohada Abrazable',
    'Funda De Almohada ',
    'Almohada Abrazable ',
    'Protector De Almohada',
    'Almohada ',
    'Colchoneta ',
    'Tapete Everest ',
    'Cojín Everest ',
    'Funda De Cojín ',
    'Relleno De Cojín ',
    'Cojín Multiusos Porto ',
    'Cojín Viafoam ',
    'Cojín ',
    'Cojines ',
    'Cojín Multiusos Porto ',
    'Velvet ',
    'Repisa ',
    'Edredón ',
    'Camino De Mesa ',
    'Cobertor Ligero ',
    'Sábanas Camiseta ',
    'Sábanas Cabos ',
    'Sábanas Modal ',
    'Sábanas Viasoft Washed ',
    'Sábanas Viasoft ',
    'Par Manteles Individuales ',
    'Manteles Individuales ',
    'Mantel Rectangular ',
    'Protector Silla ',
    'Protector De Sala',
    'Protector ',
    'Mandil ',
    'Funda De Sillón Niza ',
    'Funda De Silla Niza ',
    'Fundas De Silla ',
    'Tapete De Baño ',
    'Tapete De ',
    'Tapete Decorativo ',
    'Cortinas Translúcidas ',
    'Cortinas Viasoft ',
    'Cortinas Ravenna ',
    'Cortinas Blackout ',
    'Cortina De Baño ',
    'Toalla Caribe ',
    'Toalla Modal ',
    'Toalla Mawi ',
    'Toalla Tulum ',
    'Toalla Microsport ',
    'Bata De Baño Soft ',
    'Bata De Baño Tulum ',
    'Bata De Baño ',
    'Bata De ',
    'Salida De ',
    'Salida De Baño ',
    'Toalla Para Cabeza Tulum ',
    'Toalla Balandra ',
    'Rodapié ',
    'Jgo Espejos ',
    'Portarretratos ',
    
    'Vianney Home Velas 250 Gr ',
    'Difusor 60 Ml ',
    'Protect 125 Ml ',
    '125 Ml',
    # 'Tubo 1,00A1,80 Sencillo ',
    # 'Tubo 1,00A1,80 Doble ',
    # '',
    # '',
]

''' UTILS '''
def get_numeric_array(arr: str, resources=False, keyword=''):
    if resources and arr != '':
        print('pageResources arr:\n', arr)
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

    arr = np.array(arr)

    # viasoft, vialifresh and viafoam keywords when it appears on productName
    if keyword != '':
        arr = np.append(arr, keyword)
        # print('arr with keyword:', arr)
    # print('final arr:', type(arr), ' | ', arr)
    return arr

    # CHECK IF ALL CONTENT IS NUMERIC
    # numeric_mask = np.char.isnumeric(np.array(arr, dtype=np.unicode_))
    # if resources and arr != '':
    #     print('pageResources arr:\n', arr[numeric_mask])
    # return arr[numeric_mask]

def numpy_array_to_list(arr):
    arr.replace(" '", ", '").strip('[]').replace("'", "").split(', ')
    return arr

def get_page_title(productName: str, template: str, productType=""):
    new_keyword = ''
    if 'viasoft' in productName.lower():
        new_keyword = 'viasoft'
    if 'viafoam' in productName.lower():
        new_keyword = 'viafoam'
    if 'vialifresh' in productName.lower():
        new_keyword = 'vialifresh'
    
    # if template == "Sublinea":
    #     return productType, new_keyword

    # first, remove tallas
    tallas_to_remove = [
        'Ccc',
        'Ks/Qs',
        'Ks',
        'Std',
        'Gde',
        'Ind',
        'Mat/Ind',
        'Mat',
        'Corta',
        'Larga',
        'Qs/Mat',
        'Europea',
        'Xl',
        'Frazada',
        'Sofá',
        '1/2',
        'Baño',
        'Uni',
        'Carriola',
        'Cuna',
        'Pol',
        'Franela',
        '2-4',
        'Años',
        'Pullman',
        '1,00A1,80',
        '1,05A1,83',

        # lineas
        'Soft',
        # 'Mumbai',
        # 'Viasoft',
        'Par',
        'Velvet',
    ]
    productName = ' '.join([word for word in productName.split() if word not in tallas_to_remove])

    # then, remove other custom titles

    for substring in vianney_words_remove:
        if substring in productName:
            return productName.replace(substring, ''), new_keyword
    return productName, new_keyword


def get_page_subtitle(productType, pageTemplate, pageSubtitle):
    if pageSubtitle != "":
        return pageSubtitle
    
    product_types = {
        'Juego de Edredón': 'Juego de Edredón',
        'Edredón Novo': 'Edredón Novo',
        'Edredón Nuut': 'Edredón Nuut',
        'Cobertor Ligero': 'Cobertor Ligero',
        'Relleno de Duvet': 'relleno',
        'Funda de Duvet': 'Funda de Duvet',
        'Funda De Duvet': 'Funda de Duvet',
        
        # vianney
        'Edredón Voga': 'Edredón',
        'Edredón': 'Juego de Edredón',
        'Juego de Cocina': 'Juego de cocina',
        'Colcha': 'Colcha',
    }

    if productType in product_types:
        return product_types[productType]
    else:
        return ''

''' FUNCTIONS '''
def read_json_file(filename):
    f = open(filename)
    data = json.load(f)
    f.close()
    return data

def write_csv_file(filename, json_data):
    df = pd.DataFrame(json_data)
    df.to_csv(filename, index=False)

def process_csv_file(limit, filename):
    json_data = read_json_file('./src/lib/scripts/generated.json')
    unavailable_products = []

    with open(filename, mode='r') as csv_file:
        csv_reader = csv.DictReader(csv_file)
        line_count = 0

        updated_data = []
        for row in csv_reader:
            if line_count == limit: break
            if line_count == 0:
                line_count += 1

            ''' process '''
            # if productName is empty, then row is empty
            if 'productName' in row and row['productName'] in ['', 'productName', 'Nombre Producto']:
                continue

            # si el SKU es valido, se comienzan a llenar los campos
            if 'SKU' in row and row['SKU'] != '':
                # rename some properties
                sku = row['SKU']
                complementsIds = pd.unique(np.r_[
                    get_numeric_array(row['complSheets']),
                    get_numeric_array(row['complCurtains']),
                    get_numeric_array(row['complPillowCovers']),
                    get_numeric_array(row['complDecoration']),
                ])

                # checar si esta en la oferta maestra, sino, guardarlo en los productos no disponibles
                if sku not in json_data:
                        unavailable_products.append(sku)
                row['brandId'] = json_data[sku]['BrandId'] if sku in json_data else ""
                row['categoryId'] = json_data[sku]['CategoryId'] if sku in json_data else ""
                row['departmentId'] = json_data[sku]['DepartmentId'] if sku in json_data else ""
                row['keywords'] = json_data[sku]['KeyWords'] if sku in json_data else ""
                row['name'] = json_data[sku]['Name'] if sku in json_data else ""

                # the fields that are not changed are:
                # "productName", "SKU", "productType", "productSection", "productOrder",
                # "brandId", "categoryId", "departmentId", "keywords", "name",
                # "pageTemplate", "pageSeoTitle", "pageSeoDescription",

                # quitar los campos de la oferta maestra (tal vez quitarlo despues)
                del row['brandId']
                del row['categoryId']
                del row['departmentId']
                del row['keywords']
                del row['name']

                # begins with the 'complete csv' process
                row['productSection'] = row['productSection']
                row['productOrder'] = -1 if row['productOrder'] == '' else int(row['productOrder'])
                row['complSheets'] = get_numeric_array(row['complSheets'])
                row['complCurtains'] = get_numeric_array(row['complCurtains'])
                row['complPillowCovers'] = get_numeric_array(row['complPillowCovers'])
                row['complCushions'] = get_numeric_array(row['complCushions'])
                row['complDecoration'] = get_numeric_array(row['complDecoration'])

                # informacion de la pagina
                row['pageTitle'], keyw = get_page_title(row['productName'], row['pageTemplate'], row['productType'])
                row['pageSubtitle'] = get_page_subtitle(row['productType'], row['pageTemplate'], row['pageSubtitle'])
                row['pageCopys'] = get_numeric_array(row['pageCopys'])
                row['pageResources'] = get_numeric_array(row['pageResources'], True)
                row['pageKeywords'] = get_numeric_array(row['pageKeywords'], keyword=keyw)
                row['pageVideos'] = get_numeric_array(row['pageVideos'])
                row['pageStatus'] = row['pageStatus'] if row['pageStatus'] else 'Activa'
                # row['pageProducts'] = pd.unique(np.r_[np.array([sku]), complementsIds])
                del row['pageProducts']
                row['pageIcons'] = get_numeric_array(row['pageIcons'])

            line_count += 1
            updated_data.append(row)

        print(f'\n\nProcessed {line_count} lines.')
        print(f'{len(unavailable_products)} unavailable products:\n{unavailable_products}')
        return updated_data

''' MAIN '''
new_data = process_csv_file(-1, '/Users/Paty.Lopez/Desktop/F6 CAT WEB BD Vianney Hogar 2024.csv')
write_csv_file('./src/lib/scripts/Vianney Hogar More Completed F6.csv', new_data)

# title =  get_page_title('Viasoft Edredón Qs/Mat Xl Bernal')
# print('title:', title[2])

# try
# get_numeric_array("['nuit']", keyword='vialifresh')
# get_numeric_array("['']", keyword='')
# get_numeric_array("[]", keyword='')
# get_numeric_array("['#' '#234233']", keyword='')
