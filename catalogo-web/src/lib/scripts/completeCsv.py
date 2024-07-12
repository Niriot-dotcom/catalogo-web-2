'''
==> RUN COMMAND

python3 src/lib/scripts/completeCsv.py

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
    "productName", "sku", "productType", "productSection", "productOrder",
    "complSheets", "complPillowCovers", "complCushions", "complCurtains", "complDecoration",
    "brandId", "categoryId", "departmentId", "keywords", "name",
    "pageTitle",
    "pageSubtitle",
    "pageOrder",
    "pageTemplate",
    "pageCategory",
    "pageCopys",
    "pageDescriptions",
    "pageProducts",
    "pageIcons",
    "pageVideos",
    "pageImages",
    "pageProductsImagesPosition",
    "pageResources",
    "pageStatus",
    "pageSeoDescription",
    "pageSeoTitle",
    "pageKeywords",
]
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
bebe_words_remove = [
    'Adorno Led ',
    'Cobertor Baby Ligero ',
    'Funda De Almohada ',
    'Almohada Viafoam ',
    'Cesto ',
    'Cobertor Baby Nórdico ',
    'Cobertor Baby Siberia ',
    'Cobija Baby Voga ',
    'Funda De Cojín ',
    'Cojín ',
    'Cortinas Blackout Catania ',
    'Cortinas Translúcidas ',
    'Edredón Baby Voga ',
    'Edredón ',
    'Kit De Regalo ',
    'Manta Baby Voga ',
    'Protector De Barandal ',
    'Protector De Colchón ',
    'Jgo Repisas ',
    'Repisa ',
    'Sábana Camiseta ',
    'Sábana Viasoft Washed ',
    'Sabanitas ',
    'Sabanita ',
    'Sleep Bag ',
    'Tapete De Juego ',
    'Tapete Decorativo ',
    'Toalla Baby ',
    'Toallitas Faciales ',
    # '',
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
    'Protector de almohada ',
    'Protector De Colchón ',
    'Almohada Abrazable ',
    'Funda De Almohada ',
    'Almohada ',
    'Colchoneta ',
    'Protector ',
    'Tapete Everest ',
    'Cojín Everest ',
    'Funda De Cojín ',
    'Relleno De Cojín ',
    'Cojín Viafoam ',
    'Cojín ',
    'Velvet ',
    'Repisa ',
    'Edredón ',
    'Almohada Abrazable ',
    'Almohada ',
    'Camino De Mesa ',
    'Cobertor Ligero ',
    'Sábanas Camiseta ',
    'Sábanas Cabos ',
    'Sábanas Modal ',
    'Sábanas Viasoft Washed ',
    'Sábanas Viasoft ',
    'Par Manteles Individuales ',
    'Manteles Individuales ',
    'Protector Silla ',
    'Mandil ',
    'Funda De Sillón Niza ',
    'Funda De Silla Niza ',
    'Fundas De Silla ',
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
    'Salida De Baño ',
    'Toalla Para Cabeza Tulum ',
]

''' UTILS '''
def get_numeric_array(arr, resources=False, keyword=''):
    if resources and arr != '':
        print('pageResources arr:\n', arr)
    # arr can be:
    #    an empty string (''),
    #    ['12345' '12345']
    #    [12345, 12345]
    #    12345,12345
    if arr == '':
        arr = []
    elif "'" in arr and '[' in arr:
        arr.replace(" '", ", '").strip('[]').replace("'", "").split(', ')
    elif not "'" in arr and '[' in arr and ','in arr:
        arr.strip('[]').split(', ')
    elif not "'" in arr and '[' in arr and ','in arr:
        arr.split(',')
    else:
        raise Exception('get_numeric_array ERROR ==> Invalid input string arr:\n%s\n' % type(arr))

    # viasoft, vialifresh and viafoam keywords when it appears on productName
    if keyword != '':
        arr.append(keyword)

    return np.array(arr)

    # numeric_mask = np.char.isnumeric(np.array(arr, dtype=np.unicode_))
    # if resources and arr != '':
    #     print('pageResources arr:\n', arr[numeric_mask])
    # return arr[numeric_mask]

def numpy_array_to_list(arr):
    arr.replace(" '", ", '").strip('[]').replace("'", "").split(', ')
    return arr

def get_page_title(productName: str):
    possible_subtitle = ''
    new_keyword = ''
    if 'viasoft' in productName.lower():
        new_keyword = 'viasoft'
    if 'viafoam' in productName.lower():
        new_keyword = 'viafoam'
    if 'vialifresh' in productName.lower():
        new_keyword = 'vialifresh'

    # first, remove tallas
    tallas_to_remove = [
        'Ccc',
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
    ]
    # tallas_array and titles_array
    # productName = [' '.join([word for word in title.split() if word not in tallas_to_remove]) for title in titles_array]
    # tallas_array and title string
    productName = ' '.join([word for word in productName.split() if word not in tallas_to_remove])

    # then, remove other custom titles
    remove_from_productName = [
        'Edredón Nuut ',
        'Edredón Novo ',
        'Edredón Voga ',
        'Edredón ',
        'Funda de Duvet ',
        'Relleno de ',
        'Frazada Austral ',
        'Frazada Everest ',
        'Cobertor Ligero ',
        'Protector de almohada ',
        'Almohada Abrazable ',
        'Almohada ',
        'Colchoneta ',
        'Protector ',
        'Tapete Everest ',
        'Cojín Everest ',
        'Cojín ',
        'Velvet ',
        'Repisa ',
        # '',
        # '',
        # '',
        # '',
        # '',
        # '',
        # '',
    ]

    # returns true if productName contains some substring
    # if any(substring in productName for substring in remove_from_productName):
    # for substring in remove_from_productName:
    #     if substring in productName:
    #         return productName.replace(substring, '')

    # for substring in bebe_words_remove:
    #     if substring in productName:
    #         possible_subtitle = substring.lower()
    #         return productName.replace(substring, ''), possible_subtitle
    for substring in vianney_words_remove:
        if substring in productName:
            possible_subtitle = substring.lower()
            return productName.replace(substring, ''), possible_subtitle, new_keyword
    return productName, possible_subtitle, new_keyword


def get_page_subtitle(productType, pageTemplate):
    product_types = {
        'Juego de Edredón': 'juego de edredón',
        'Edredón Novo': 'edredón novo',
        'Edredón Nuut': 'edredón nuut',
        'Cobertor Ligero': 'cobertor ligero',
        'Relleno de Duvet': 'relleno',
        'Funda de Duvet': 'funda de duvet',
        'Funda De Duvet': 'funda de duvet',
        
        # vianney
        'Edredón Voga': 'edredón',
        'Edredón': 'juego de edredón',
        'Juego de Cocina': 'Juego de cocina',
    }
    # templates_with_subtitles = {
    #     'JuegoDeEdredon',
    #     'EdredonNovo',
    #     'EdredonNuut',
    #     'Cobertor',
    #     'VariantesDeColor',
    # }

    if productType in product_types:
        return product_types[productType]
    else:
        return ''
        if pageTemplate == 'VariantesDeColor':

            return ''
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

def read_csv_file(filename):
    cols = ''
    json_data = read_json_file('./src/lib/scripts/generated.json')
    unavailable_products = []

    with open(filename, mode='r') as csv_file:
        csv_reader = csv.DictReader(csv_file)
        line_count = 0

        updated_data = []
        for row in csv_reader:
            # if line_count == 195: break
            if line_count == 0:
                cols = ", ".join(row)
                line_count += 1

            ''' process '''

            # if productName is empty, then row is empty
            if 'productName' in row and row['productName'] in ['', 'productName', 'Nombre Producto']:
                continue

            '''
            # here begins with products.
            # we only have productName, SKU, productType, productSection, productOrder.
            # we need to complete:
                complSheets, complPillowCovers, complCurtains, complDecoration,
                brandId, categoryId, departmentId, keywords, name
            '''
            if 'SKU' in row and row['SKU'] != '':
                # rename some properties
                sku = row['SKU']
                complementsIds = get_numeric_array(pd.unique(np.r_[
                    row['complSheets'].replace(" '", ", '").strip('[]').replace("'", "").split(', ') if "'" in row['complSheets'] else row['complSheets'].split(','),
                    row['complCurtains'].replace(" '", ", '").strip('[]').replace("'", "").split(', ') if "'" in row['complCurtains'] else row['complCurtains'].split(','),
                    row['complPillowCovers'].replace(" '", ", '").strip('[]').replace("'", "").split(', ') if "'" in row['complPillowCovers'] else row['complPillowCovers'].split(','),
                    row['complDecoration'].replace(" '", ", '").strip('[]').replace("'", "").split(', ') if "'" in row['complDecoration'] else row['complDecoration'].split(','),
                    # row['complSheets']
                    # row['complCurtains'],
                    # row['complPillowCovers'],
                    # row['complDecoration'],
                ]))

                row['productOrder'] = int(row['productOrder'])
                row['complSheets'] = get_numeric_array(row['complSheets'].replace(" '", ", '").strip('[]').replace("'", "").split(', ') if "'" in row['complSheets'] else row['complSheets'].split(','))
                row['complCurtains'] = get_numeric_array(row['complCurtains'].replace(" '", ", '").strip('[]').replace("'", "").split(', ') if "'" in row['complCurtains'] else row['complCurtains'].split(','))
                row['complPillowCovers'] = get_numeric_array(row['complPillowCovers'].replace(" '", ", '").strip('[]').replace("'", "").split(', ') if "'" in row['complPillowCovers'] else row['complPillowCovers'].split(','))
                row['complDecoration'] = get_numeric_array(row['complDecoration'].replace(" '", ", '").strip('[]').replace("'", "").split(', ') if "'" in row['complDecoration'] else row['complDecoration'].split(','))
                    
                # row['complSheets'] = get_numeric_array(row['complSheets'].split(','))
                # row['complCurtains'] = get_numeric_array(row['complCurtains'].split(','))
                # row['complPillowCovers'] = get_numeric_array(row['complPillowCovers'].split(','))
                # row['complDecoration'] = get_numeric_array(row['complDecoration'].split(','))

                if sku not in json_data:
                    unavailable_products.append(sku)
                    # print(f'here {sku} does not exist in data')

                # fullfiling => complSheets, complPillowCovers,
                #               complCurtains, complDecoration
                # row['complSheets'] = row['complSheets'].split(',')
                # row['complPillowCovers'] = row['complPillowCovers'].split(',')
                # row['complCurtains'] = row['complCurtains'].split(',')
                # row['complDecoration'] = row['complDecoration'].split(',')

                # fullfiling => brandId, categoryId, departmentId, keywords, name
                row['brandId'] = json_data[sku]['BrandId'] if sku in json_data else ""
                row['categoryId'] = json_data[sku]['CategoryId'] if sku in json_data else ""
                row['departmentId'] = json_data[sku]['DepartmentId'] if sku in json_data else ""
                row['keywords'] = json_data[sku]['KeyWords'] if sku in json_data else ""
                row['name'] = json_data[sku]['Name'] if sku in json_data else ""
                
                # fullfiling => pageTitle, pageTemplate, pageCategory, pageSubtitle,
                #               pageDescriptions, pageType, pageIsSingleProduct, pageCopys,
                #               pageProducts, pageMainImage, pageImages, pageComplementProducts,
                #               pageProductsImagesPosition, pageResources, pageIcons,
                #               pageProductsInImage, pageProductsImages, pageMainVideo,
                #               pageVideos, pageRelatedProducts, pageStatus, pageSeoDescription,
                #               pageSeoTitle, pageKeywords
                row['pageTitle'] = get_page_title(row['productName'])
                row['pageSubtitle'] = get_page_subtitle(row['productType'], row['pageTemplate'])
                row['pageOrder'] = row['productOrder']
                row['pageCategory'] = row['productSection'].split('/ ')[1]
                row['pageProducts'] = get_numeric_array(pd.unique(np.r_[np.array([sku]), complementsIds]))
                row['pageCopys'] = np.array([]) if row['pageCopys'] == '' else numpy_array_to_list(row['pageCopys'])
                row['pageIcons'] = np.array([]) if row['pageIcons'] == '' else get_numeric_array(row['pageIcons'].replace(" '", ", '").strip('[]').replace("'", "").split(', ') if "'" in row['pageIcons'] else row['pageIcons'].split(','))
                row['pageVideos'] = np.array([]) if row['pageVideos'] == '' else row['pageVideos']
                row['pageImages'] = np.array([]) if row['pageImages'] == '' else row['pageImages']
                row['pageResources'] = np.array([]) if row['pageResources'] == '' else row['pageResources']
                row['pageDescriptions'] = np.array([]) if row['pageDescriptions'] == '' else row['pageDescriptions']
                row['pageStatus'] = row['pageStatus'] if row['pageStatus'] else 'Activa'
                # row['pageKeywords'] = json_data[sku]['KeyWords'] if sku in json_data else np.array([])
                if row['pageType'] == 'Almohadas' or row['pageType'] == 'Almohadas Viafoam':
                    print(row['productName'], row['pageKeywords'], end=' = ')
                row['pageKeywords'] = numpy_array_to_list(row['pageKeywords']) if "'" in row['pageKeywords'] else np.array(row['pageKeywords'].split(','))
                if row['pageType'] == 'Almohadas' or row['pageType'] == 'Almohadas Viafoam':
                    print(row['pageKeywords'])
                
                row['pageType'] = row['productType']
                row['pageComplementProducts'] = complementsIds
                row['pageRelatedProducts'] = get_numeric_array(pd.unique(np.r_[np.array([sku]), complementsIds]))
                    
                # print('updated row {}:\n{}\n\n'.format(
                #         line_count,
                #         json.dumps(row, cls=NumpyArrayEncoder, indent='\t', ensure_ascii=False)
                # ))

            line_count += 1
            updated_data.append(row)

        # write_csv_file('', updated_data)
        print(f'\n\nProcessed {line_count} lines.')
        print(f'{len(unavailable_products)} unavailable products: {unavailable_products}')
        return updated_data
    # print(cols)

    # print('updated_data:', len(updated_data))
    # print('updated_data:', updated_data)
    # with open('output.csv', 'w', newline='') as new_csv_file:
    #     writer = csv.writer(new_csv_file)
    #     # Write headers
    #     writer.writerow(headers)
    #     # Write updated data
    #     writer.writerows(updated_data)

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
                row['pageTitle'], subt, keyw = get_page_title(row['productName'])
                row['pageSubtitle'] = subt if subt != '' else get_page_subtitle(row['productType'], row['pageTemplate'])
                row['pageCopys'] = get_numeric_array(row['pageCopys'])
                row['pageResources'] = get_numeric_array(row['pageResources'], True)
                row['pageKeywords'] = get_numeric_array(row['pageKeywords'], keyword=keyw)
                row['pageVideos'] = get_numeric_array(row['pageVideos'])
                row['pageStatus'] = row['pageStatus'] if row['pageStatus'] else 'Activa'
                row['pageProducts'] = pd.unique(np.r_[np.array([sku]), complementsIds])
                row['pageIcons'] = get_numeric_array(row['pageIcons'])

            line_count += 1
            updated_data.append(row)

        print(f'\n\nProcessed {line_count} lines.')
        print(f'{len(unavailable_products)} unavailable products:\n{unavailable_products}')
        return updated_data

''' MAIN '''
# new_data = read_csv_file('/Users/Paty.Lopez/Documents/GitHub/catalogo-web/catalogo-web/src/lib/scripts/out_keywords.csv')

# new_data = process_csv_file(-1, '/Users/Paty.Lopez/Desktop/CAT WEB BD Bebe 2024.csv')
# write_csv_file('./src/lib/scripts/Bebe.csv', new_data)

new_data = process_csv_file(-1, '/Users/Paty.Lopez/Desktop/CAT WEB BD Vianney Hogar 2024.csv')
write_csv_file('./src/lib/scripts/Vianney Hogar.csv', new_data)

# title =  get_page_title('Viasoft Edredón Qs/Mat Xl Bernal')
# print('title:', title[2])