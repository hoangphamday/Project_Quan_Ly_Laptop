export const flashSaleProducts = [
  {
    id: 1,
    name: 'Dell Pro 14 PC14250 | Core 5 120U, 8GB, 512GB, Intel Graphics, 14 iCnh FHD+',
    price: '14.990.000',
    oldPrice: '19.890.000',
    discount: '-25%',
    image: '/product_1.jpg',
    stockLeft: 3
  },
  {
    id: 2,
    name: 'Dell DC15250 NKFV | Core i5-1334U, 8GB, 512GB, Intel UHD Graphics, 15.6 inch FHD 120Hz',
    price: '13.490.000',
    oldPrice: '',
    discount: '',
    image: '/product_2.png',
    stockLeft: 2
  },
  {
    id: 3,
    name: 'Lenovo Xiaoxin Pro 14c AHP10R 2025 NKFV | Ryzen 7 H 255, 24GB, 1TB, 14.0" 2.8K OLED',
    price: '22.390.000',
    oldPrice: '24.990.000',
    discount: '-10%',
    image: '/product_3.jpg',
    stockLeft: 3
  },
  {
    id: 4,
    name: 'Laptop Gaming HP Victus 15-fa2013dx NKFV | Core i5-13420H, 8GB, 512GB, RTX 3050',
    price: '19.190.000',
    oldPrice: '',
    discount: '',
    image: '/product_4.jpg',
    stockLeft: 5
  }
];

export const officeProducts = [
  {
    id: 5,
    name: 'Dell Inspiron 14 5445 R1808L NKFV | Ryzen 7 8840HS, 16GB, 512GB, AMD Radeon',
    price: '17.790.000',
    oldPrice: '',
    discount: '-3%',
    image: '/product_5.jpg'
  },
  {
    id: 6,
    name: 'Dell Inspiron 14 5440 NKFV | Core i5-1334U, 8GB, 512GB, 14" FHD+',
    price: '15.390.000',
    oldPrice: '',
    discount: '-30%',
    image: '/product_6.jpg'
  },
  {
    id: 7,
    name: 'Lenovo Thinkbook 14 G7+ AHP 21U40001CD NKFV | Ryzen 7 H 255, 24GB, 512GB',
    price: '21.890.000',
    oldPrice: '',
    discount: '-12%',
    image: '/product_7.jpg'
  },
  {
    id: 8,
    name: 'Dell Inspiron 3530 NKFV | Core i5-1334U, 8GB, 512GB, Intel Iris Xe Graphics',
    price: '13.490.000',
    oldPrice: '',
    discount: '-8%',
    image: '/product_8.png'
  }
];

export const gamingProducts = [
  {
    id: 9,
    name: 'Dell Inspiron 14 5445 R1808L NKFV | Ryzen 7 8840HS, 16GB, 512GB, AMD Radeon',
    price: '17.790.000',
    oldPrice: '',
    discount: '-3%',
    image: '/product_9.jpg'
  },
  {
    id: 10,
    name: 'Dell Inspiron 14 5440 NKFV | Core i5-1334U, 8GB, 512GB, 14" FHD+',
    price: '15.390.000',
    oldPrice: '',
    discount: '-30%',
    image: '/product_10.jpg'
  },
  {
    id: 11,
    name: 'Lenovo Thinkbook 14 G7+ AHP 21U40001CD NKFV | Ryzen 7 H 255, 24GB, 512GB',
    price: '21.890.000',
    oldPrice: '',
    discount: '-12%',
    image: '/product_11.png'
  },
  {
    id: 12,
    name: 'Dell Inspiron 3530 NKFV | Core i5-1334U, 8GB, 512GB, Intel Iris Xe Graphics',
    price: '13.490.000',
    oldPrice: '',
    discount: '-8%',
    image: '/product_12.jpg'
  }
];

export const graphicsProducts = [
  {
    id: 13,
    name: 'Laptop HP ZBook Firefly 14 G10 | Core i7-1355U, 16GB, 512GB, RTX A500',
    price: '28.990.000',
    oldPrice: '31.990.000',
    discount: '-9%',
    image: '/product_13.jpg'
  },
  {
    id: 14,
    name: 'MacBook Pro 14 M3 Pro 2023 | 11-core CPU, 14-core GPU, 18GB, 512GB',
    price: '48.490.000',
    oldPrice: '',
    discount: '',
    image: '/product_14.png'
  },
  {
    id: 15,
    name: 'Laptop ASUS ProArt Studiobook 16 OLED | i9-13980HX, 32GB, 1TB, RTX 4070',
    price: '59.990.000',
    oldPrice: '',
    discount: '',
    image: '/product_15.png'
  },
  {
    id: 16,
    name: 'Dell Precision 3581 Mobile Workstation | Core i7-13700H, 16GB, 512GB',
    price: '34.990.000',
    oldPrice: '',
    discount: '',
    image: '/product_6.jpg' 
  }
];

export const macbookProducts = [
  {
    id: 17,
    name: 'MacBook Pro 14 M3 Pro 2023 | 11-core CPU, 14-core GPU, 18GB, 512GB',
    price: '48.490.000',
    oldPrice: '',
    discount: '',
    image: '/product_14.png'
  },
  {
    id: 18,
    name: 'MacBook Air 13 M2 2022 | 8-core CPU, 8-core GPU, 8GB, 256GB',
    price: '24.990.000',
    oldPrice: '',
    discount: '',
    image: '/product_18.jpg'
  },
  {
    id: 19,
    name: 'MacBook Pro 16 M3 Max 2023 | 14-core CPU, 30-core GPU, 36GB, 1TB',
    price: '79.990.000',
    oldPrice: '',
    discount: '',
    image: '/product_17.jpg'
  },
  {
    id: 20,
    name: 'MacBook Air 15 M2 2023 | 8-core CPU, 8-core GPU, 8GB, 256GB',
    price: '28.990.000',
    oldPrice: '31.900.000',
    discount: '-7%',
    image: '/product_19.jpg'
  }
];

// Helper to get all products in one array
export const getAllProducts = () => {
  return [
    ...flashSaleProducts,
    ...officeProducts,
    ...gamingProducts,
    ...graphicsProducts,
    ...macbookProducts
  ];
};
