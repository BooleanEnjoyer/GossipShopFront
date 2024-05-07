import { Product } from 'src/app/entity/product/product';
import { ProductCategories } from "src/app/entity/product/enums/product-categories";

export function generateMusicProducts(): Product[] {
    const basePath = "assets\\images\\MUSIC";
    const musicProducts: Product[] = [
      new Product(
        '1',
        'Acoustic Guitar',
        299.99,
        basePath + '\\Acoustic Guitar\\',
        ['1.png', '2.png', '3.png', '4.png'],
        new Date(),
        'Classic acoustic guitar for beginners',
        '6 strings, wooden body, steel strings',
        ProductCategories.MUSIC
      ),
      new Product(
        '2',
        'Piano Keyboard',
        499.99,
        basePath + '\\Piano Keyboard\\',
        ['5.png', '6.png'],
        new Date(),
        '88-key digital piano keyboard',
        '88 keys, weighted keys, multiple sound options',
        ProductCategories.MUSIC
      ),
      new Product(
        '3',
        'Wireless Headphones',
        129.99,
        basePath + '\\Wireless Headphones\\',
        ['7.png', '8.png', '9.png', '10.png'],
        new Date(),
        'Premium wireless headphones with noise cancellation',
        'Bluetooth, noise cancellation, 20 hours battery life',
        ProductCategories.MUSIC
      ),
      // Add more products if needed
    ];
  
    return musicProducts;
  }
