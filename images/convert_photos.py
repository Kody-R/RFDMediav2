import os
from PIL import Image

def convert_webp_to(output_format='jpg'):
    """
    Convert all .webp images in the current script folder to the specified format (jpg or png).
    :param output_format: Desired output format ('jpg' or 'png').
    """
    if output_format not in ['jpg', 'png']:
        print("Invalid format. Please choose 'jpg' or 'png'.")
        return

    image_folder = os.getcwd()
    output_folder = os.path.join(image_folder, f'converted_{output_format}')
    os.makedirs(output_folder, exist_ok=True)

    for filename in os.listdir(image_folder):
        if filename.lower().endswith('.webp'):
            webp_path = os.path.join(image_folder, filename)
            output_path = os.path.join(output_folder, f"{os.path.splitext(filename)[0]}.{output_format}")
            
            with Image.open(webp_path) as img:
                if output_format == 'jpg':
                    img = img.convert("RGB")  # Convert to RGB for JPG
                img.save(output_path, output_format.upper())
            
            print(f"Converted: {filename} -> {output_path}")

    print(f"All .webp images have been converted to {output_format.upper()} and saved in {output_folder}.")

if __name__ == "__main__":
    output_format = input("Enter output format (jpg/png): ").lower()
    convert_webp_to(output_format)
