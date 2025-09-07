import os

def formatear_nombre(nombre_archivo):
    nombre = os.path.splitext(nombre_archivo)[0]
    nombre = nombre.replace('-', ' ').replace('_', ' ')
    nombre = ' '.join([palabra.capitalize() for palabra in nombre.split()])
    return nombre

def obtener_categoria(nombre_archivo):
    # Diccionario de categorías con palabras clave asociadas
    categorias = {
        'school': ['bata', 'esola', 'professor', 'pitet'],
        'dance': ['dance', 'ballet', 'patinatge', 'dança', 'mallot'],
        'sport': ['esport', 'bicicleta', 'xandall', 'shorts']
    }
    
    # Busca la categoría correspondiente
    for categoria, palabras_clave in categorias.items():
        for palabra in palabras_clave:
            if palabra in nombre_archivo.lower():  # Convierte a minúsculas para evitar problemas de mayúsculas/minúsculas
                return categoria  # Devuelve la categoría si encuentra una coincidencia
    return 'unknown'  # Categoría por defecto si no se encuentra ninguna coincidencia

# Rutas
ruta_imagenes = 'assets/img/galery'
ruta_salida_js = 'js/galeria-data.js'

# Obtiene todos los archivos válidos
try:
    archivos = [
        f for f in os.listdir(ruta_imagenes)
        if f.lower().endswith(('.jpg', '.jpeg', '.png', '.webp'))
    ]
except FileNotFoundError:
    print(f"Error: El directorio de imágenes '{ruta_imagenes}' no fue encontrado.")
    exit()

# Genera el contenido del archivo JS
contenido_js = "const imagenes = [\n"
for archivo in archivos:
    nombre = formatear_nombre(archivo)
    categoria = obtener_categoria(archivo)  # Obtiene la categoría automáticamente
    contenido_js += f'  {{ archivo: "{archivo}", nombre: "{nombre}", categoria: "{categoria}" }},\n'
contenido_js += "];\n"

# Escribe el archivo de datos
try:
    with open(ruta_salida_js, 'w', encoding='utf-8') as f:
        f.write(contenido_js)
    print(f"¡Éxito! El archivo '{ruta_salida_js}' ha sido creado/actualizado con {len(archivos)} imágenes.")
except IOError as e:
    print(f"Error al escribir el archivo '{ruta_salida_js}': {e}")