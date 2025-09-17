import os

def generate_gallery_data():
    """
    Scans the 'assets/img/galery' directory and creates a JavaScript file
    with an 'imageCategories' object.
    """
    base_path = 'assets/img/galery'
    output_path = 'js/galeria-data.js'
    
    image_categories = {}

    # Check if the base path exists
    if not os.path.isdir(base_path):
        print(f"Error: The directory '{base_path}' was not found.")
        return

    # Iterate over each category (subdirectories in the base path)
    for category in os.listdir(base_path):
        category_path = os.path.join(base_path, category)
        if os.path.isdir(category_path):
            images = []
            # Iterate over each file in the category directory
            for image_file in os.listdir(category_path):
                # Check for valid image extensions
                if image_file.lower().endswith(('.png', '.jpg', '.jpeg', '.webp')):
                    images.append(image_file)
            image_categories[category] = images

    # Generate the JavaScript file content
    js_content = "const imageCategories = {\n"
    for category, images in image_categories.items():
        js_content += f"  '{category}': [\n"
        for image in images:
            js_content += f'    "{image}",\n'
        js_content += "  ],\n"
    js_content += "};\n"
    js_content += "const imagenes = Object.entries(imageCategories).flatMap(([categoria, archivos]) => archivos.map(archivo => ({archivo: `${categoria}/${archivo}`, categoria})));"

    # Write the content to the output file
    try:
        with open(output_path, 'w', encoding='utf-8') as f:
            f.write(js_content)
        print(f"Successfully created '{output_path}' with the updated image data.")
    except IOError as e:
        print(f"Error writing to file '{output_path}': {e}")

if __name__ == '__main__':
    generate_gallery_data()