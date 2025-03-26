export const trademarks = [
  {
    name: 'BILLABONG',
    metaTitle: 'soy metatitle',
    metaDescription: 'soy metadescription',
    metaKeywords: 'metakeywords',
    ogImage: 'urlImage',
    twitterCard: 'pepepep',
    logo: 'logo',
    officialWebsite: 'https://pepe.com',
    socialMedia: 'pepepe',
    brandStory: 'ididididid'
  },
  {
    name: 'RIP CURL',
    metaTitle: 'soy metatitle',
    metaDescription: 'soy metadescription',
    metaKeywords: 'metakeywords',
    ogImage: 'urlImage',
    twitterCard: 'pepepep',
    logo: 'logo',
    officialWebsite: 'https://pepe.com',
    socialMedia: 'pepepe',
    brandStory: 'ididididid'
  }
]
//! &&&&&&&&&&&&&&&&&&&&&&&&&&

export const attributes = [
  {
    name: 'Hombre',
    type: 'Genre'
  },
  {
    name: 'Mujer',
    type: 'Genre'
  },
  {
    name: 'Gala',
    type: 'Discipline'
  },
  {
    name: 'Moda',
    type: 'Discipline'
  },
  {
    name: 'Trajes',
    type: 'Category'
  },
  {
    name: 'Chalecos',
    type: 'Category'
  }

]

// ?%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

export const product = {
  name: 'Producto uno',
  description: 'Descripcion producto uno',
  images: [
    'http://images1',
    'http://images2',
    'http://images3',
    'http://images4'
  ],
  released: '2025-02-24',
  category: 5,
  discipline: 3,
  genre: 1,
  trademark: 1,
  variants: [
    {
      order: 1,
      characteristics: 'Características de la Variante 1',
      price: 19.99,
      stock: 100,
      images: [
        'http://images1',
        'http://images2',
        'http://images3',
        'http://images4'
      ],
      size: '38',
      color: 'Blanco'
    },
    {
      order: 2,
      characteristics: 'Características de la Variante 2',
      price: 19.99,
      stock: 50,
      images: [
        'http://images1',
        'http://images2',
        'http://images3',
        'http://images4'
      ],
      size: '40',
      color: 'Negro'
    }

  ]
}

//* $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

export const products = [
  {
    name: 'Producto dos',
    description: 'Descripcion producto dos',
    images: [
      'http://images1',
      'http://images2',
      'http://images3',
      'http://images4'
    ],
    released: '2025-02-24',
    category: 6,
    discipline: 4,
    genre: 2,
    trademark: 2,
    variants: [
      {
        order: 1,
        characteristics: 'Características de la Variante 1',
        price: 19.99,
        stock: 100,
        images: [
          'http://images1',
          'http://images2',
          'http://images3',
          'http://images4'
        ],
        size: '38',
        color: 'Blanco'
      },
      {
        order: 2,
        characteristics: 'Características de la Variante 2',
        price: 19.99,
        stock: 50,
        images: [
          'http://images1',
          'http://images2',
          'http://images3',
          'http://images4'
        ],
        size: '40',
        color: 'Negro'
      }

    ]
  },
  {
    name: 'Producto tres',
    description: 'Descripcion producto tres',
    images: [
      'http://images1',
      'http://images2',
      'http://images3',
      'http://images4'
    ],
    released: '2025-02-24',
    category: 5,
    discipline: 3,
    genre: 1,
    trademark: 1,
    variants: [
      {
        order: 1,
        characteristics: 'Características de la Variante 1',
        price: 19.99,
        stock: 100,
        images: [
          'http://images1',
          'http://images2',
          'http://images3',
          'http://images4'
        ],
        size: '38',
        color: 'Blanco'
      },
      {
        order: 2,
        characteristics: 'Características de la Variante 2',
        price: 19.99,
        stock: 50,
        images: [
          'http://images1',
          'http://images2',
          'http://images3',
          'http://images4'
        ],
        size: '40',
        color: 'Negro'
      }

    ]
  },
  {
    name: 'Producto cuatro',
    description: 'Descripcion producto cuatro',
    images: [
      'http://images1',
      'http://images2',
      'http://images3',
      'http://images4'
    ],
    released: '2025-02-24',
    category: 6,
    discipline: 4,
    genre: 1,
    trademark: 2,
    variants: [
      {
        order: 1,
        characteristics: 'Características de la Variante 1',
        price: 19.99,
        stock: 100,
        images: [
          'http://images1',
          'http://images2',
          'http://images3',
          'http://images4'
        ],
        size: '38',
        color: 'Blanco'
      },
      {
        order: 2,
        characteristics: 'Características de la Variante 2',
        price: 19.99,
        stock: 50,
        images: [
          'http://images1',
          'http://images2',
          'http://images3',
          'http://images4'
        ],
        size: '40',
        color: 'Negro'
      }

    ]
  }
]

// todo#######################################

export const mainResponse = {
  id: expect.any(String),
  name: 'Producto uno',
  description: 'Descripcion producto uno',
  images: [
    'http://images1',
    'http://images2',
    'http://images3',
    'http://images4'
  ],
  released: '2025-02-24',
  category: null,
  discipline: null,
  genre: null,
  trademark: null,
  enable: true
}

export const variantResponse = [
  {
    id: expect.any(String),
    order: 1,
    characteristics: 'Características de la Variante 1',
    price: '19.99',
    stock: 100,
    images: [
      'http://images1',
      'http://images2',
      'http://images3',
      'http://images4'
    ],
    size: '38',
    color: 'Blanco',
    enable: true,
    ProductId: expect.any(String)

  },
  {
    id: expect.any(String),
    order: 2,
    characteristics: 'Características de la Variante 2',
    price: '19.99',
    stock: 50,
    images: [
      'http://images1',
      'http://images2',
      'http://images3',
      'http://images4'
    ],
    size: '40',
    color: 'Negro',
    enable: true,
    ProductId: expect.any(String)

  }
]

//* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
export const getResponse = [
  {
    id: expect.any(String),
    name: 'Producto uno',
    description: 'Descripcion producto uno',
    images: [
      'http://images1',
      'http://images2',
      'http://images3',
      'http://images4'
    ],
    released: '2025-02-24',
    enable: true,
    attributes: [
      { Genre: 'Hombre' },
      { Discipline: 'Gala' },
      { Category: 'Trajes' }
    ],
    trademark: { name: 'BILLABONG', logo: 'logo' },
    variants: [
      {
        ProductId: expect.any(String),
        characteristics: 'Características de la Variante 1',
        images: [
          'http://images1',
          'http://images2',
          'http://images3',
          'http://images4'
        ],
        id: expect.any(String),
        order: 1
      },
      {
        ProductId: expect.any(String),
        characteristics: 'Características de la Variante 2',
        images: [
          'http://images1',
          'http://images2',
          'http://images3',
          'http://images4'
        ],
        id: expect.any(String),
        order: 2

      }
    ]
  },
  {
    id: expect.any(String),
    name: 'Producto dos',
    description: 'Descripcion producto dos',
    images: [
      'http://images1',
      'http://images2',
      'http://images3',
      'http://images4'
    ],
    released: '2025-02-24',
    enable: true,
    attributes: [
      { Genre: 'Mujer' },
      { Discipline: 'Moda' },
      { Category: 'Chalecos' }
    ],
    trademark: { name: 'RIP CURL', logo: 'logo' },
    variants: [
      {
        id: expect.any(String),
        order: 1,
        characteristics: 'Características de la Variante 1',
        images: [
          'http://images1',
          'http://images2',
          'http://images3',
          'http://images4'
        ],
        ProductId: expect.any(String)
      },
      {
        id: expect.any(String),
        order: 2,
        characteristics: 'Características de la Variante 2',
        images: [
          'http://images1',
          'http://images2',
          'http://images3',
          'http://images4'
        ],
        ProductId: expect.any(String)
      }

    ]
  }

]

export const getResponsePage2 = [
  {
    id: expect.any(String),
    name: 'Producto tres',
    description: 'Descripcion producto tres',
    images: [
      'http://images1',
      'http://images2',
      'http://images3',
      'http://images4'
    ],
    released: '2025-02-24',
    enable: true,
    attributes: [
      { Genre: 'Hombre' },
      { Discipline: 'Gala' },
      { Category: 'Trajes' }
    ],
    trademark: { name: 'BILLABONG', logo: 'logo' },
    variants: [
      {
        ProductId: expect.any(String),
        characteristics: 'Características de la Variante 1',
        images: [
          'http://images1',
          'http://images2',
          'http://images3',
          'http://images4'
        ],
        id: expect.any(String),
        order: 1
      },
      {
        ProductId: expect.any(String),
        characteristics: 'Características de la Variante 2',
        images: [
          'http://images1',
          'http://images2',
          'http://images3',
          'http://images4'
        ],
        id: expect.any(String),
        order: 2

      }
    ]
  },
  {
    id: expect.any(String),
    name: 'Producto cuatro',
    description: 'Descripcion producto cuatro',
    images: [
      'http://images1',
      'http://images2',
      'http://images3',
      'http://images4'
    ],
    released: '2025-02-24',
    enable: true,
    attributes: [
      { Genre: 'Hombre' },
      { Discipline: 'Moda' },
      { Category: 'Chalecos' }
    ],
    trademark: { name: 'RIP CURL', logo: 'logo' },
    variants: [
      {
        id: expect.any(String),
        order: 1,
        characteristics: 'Características de la Variante 1',
        images: [
          'http://images1',
          'http://images2',
          'http://images3',
          'http://images4'
        ],
        ProductId: expect.any(String)
      },
      {
        id: expect.any(String),
        order: 2,
        characteristics: 'Características de la Variante 2',
        images: [
          'http://images1',
          'http://images2',
          'http://images3',
          'http://images4'
        ],
        ProductId: expect.any(String)
      }

    ]
  }

]
export const getResponseSize3 = [
  {
    id: expect.any(String),
    name: 'Producto cuatro',
    description: 'Descripcion producto cuatro',
    images: [
      'http://images1',
      'http://images2',
      'http://images3',
      'http://images4'
    ],
    released: '2025-02-24',
    enable: true,
    attributes: [
      { Genre: 'Hombre' },
      { Discipline: 'Moda' },
      { Category: 'Chalecos' }
    ],
    trademark: { name: 'RIP CURL', logo: 'logo' },
    variants: [
      {
        id: expect.any(String),
        order: 1,
        characteristics: 'Características de la Variante 1',
        images: [
          'http://images1',
          'http://images2',
          'http://images3',
          'http://images4'
        ],
        ProductId: expect.any(String)
      },
      {
        id: expect.any(String),
        order: 2,
        characteristics: 'Características de la Variante 2',
        images: [
          'http://images1',
          'http://images2',
          'http://images3',
          'http://images4'
        ],
        ProductId: expect.any(String)
      }

    ]
  }

]

export const getResponseSize4 = [
  {
    id: expect.any(String),
    name: 'Producto dos',
    description: 'Descripcion producto dos',
    images: [
      'http://images1',
      'http://images2',
      'http://images3',
      'http://images4'
    ],
    released: '2025-02-24',
    enable: true,
    attributes: [
      { Genre: 'Mujer' },
      { Discipline: 'Moda' },
      { Category: 'Chalecos' }
    ],
    trademark: { name: 'RIP CURL', logo: 'logo' },
    variants: [
      {
        id: expect.any(String),
        order: 1,
        characteristics: 'Características de la Variante 1',
        images: [
          'http://images1',
          'http://images2',
          'http://images3',
          'http://images4'
        ],
        ProductId: expect.any(String)
      },
      {
        id: expect.any(String),
        order: 2,
        characteristics: 'Características de la Variante 2',
        images: [
          'http://images1',
          'http://images2',
          'http://images3',
          'http://images4'
        ],
        ProductId: expect.any(String)
      }

    ]
  },
  {
    id: expect.any(String),
    name: 'Producto cuatro',
    description: 'Descripcion producto cuatro',
    images: [
      'http://images1',
      'http://images2',
      'http://images3',
      'http://images4'
    ],
    released: '2025-02-24',
    enable: true,
    attributes: [
      { Genre: 'Hombre' },
      { Discipline: 'Moda' },
      { Category: 'Chalecos' }
    ],
    trademark: { name: 'RIP CURL', logo: 'logo' },
    variants: [
      {
        id: expect.any(String),
        order: 1,
        characteristics: 'Características de la Variante 1',
        images: [
          'http://images1',
          'http://images2',
          'http://images3',
          'http://images4'
        ],
        ProductId: expect.any(String)
      },
      {
        id: expect.any(String),
        order: 2,
        characteristics: 'Características de la Variante 2',
        images: [
          'http://images1',
          'http://images2',
          'http://images3',
          'http://images4'
        ],
        ProductId: expect.any(String)
      }

    ]
  }

]
export const getResponseSize5 = [
  {
    id: expect.any(String),
    name: 'Producto dos',
    description: 'Descripcion producto dos',
    images: [
      'http://images1',
      'http://images2',
      'http://images3',
      'http://images4'
    ],
    released: '2025-02-24',
    enable: true,
    attributes: [
      // {"Genre" :"Mujer"},
      { Discipline: 'Moda' }
      // {"Category": "Chalecos"}
    ],
    trademark: { name: 'RIP CURL', logo: 'logo' },
    variants: [
      {
        id: expect.any(String),
        order: 1,
        characteristics: 'Características de la Variante 1',
        images: [
          'http://images1',
          'http://images2',
          'http://images3',
          'http://images4'
        ],
        ProductId: expect.any(String)
      },
      {
        id: expect.any(String),
        order: 2,
        characteristics: 'Características de la Variante 2',
        images: [
          'http://images1',
          'http://images2',
          'http://images3',
          'http://images4'
        ],
        ProductId: expect.any(String)
      }

    ]
  },
  {
    id: expect.any(String),
    name: 'Producto cuatro',
    description: 'Descripcion producto cuatro',
    images: [
      'http://images1',
      'http://images2',
      'http://images3',
      'http://images4'
    ],
    released: '2025-02-24',
    enable: true,
    attributes: [
      // {"Genre" :"Hombre"},
      { Discipline: 'Moda' }
      // {"Category": "Chalecos"}
    ],
    trademark: { name: 'RIP CURL', logo: 'logo' },
    variants: [
      {
        id: expect.any(String),
        order: 1,
        characteristics: 'Características de la Variante 1',
        images: [
          'http://images1',
          'http://images2',
          'http://images3',
          'http://images4'
        ],
        ProductId: expect.any(String)
      },
      {
        id: expect.any(String),
        order: 2,
        characteristics: 'Características de la Variante 2',
        images: [
          'http://images1',
          'http://images2',
          'http://images3',
          'http://images4'
        ],
        ProductId: expect.any(String)
      }

    ]
  }

]
/* {
        id:expect.any(String),
        name: "Producto tres",
        description: "Descripcion producto tres",
        images : [
                    "http://images1",
                    "http://images2",
                    "http://images3",
                    "http://images4"
        ],
        released: "2025-02-24",
        category: 4,
        discipline : 3,
        genre: 1,
        trademark : 1,
        variants : [
            {
                order: 1,
                characteristics: "Características de la Variante 1",
                price: 19.99,
                stock: 100,
                images: [
                    "http://images1",
                    "http://images2",
                    "http://images3",
                    "http://images4"
                ],
                size:"38",
                color: "Blanco",
                "ProductId": expect.any(String),
            },
            {
                order: 2,
                characteristics: "Características de la Variante 2",
                price: 19.99,
                stock: 50,
                images: [
                    "http://images1",
                    "http://images2",
                    "http://images3",
                    "http://images4"
                ],
                size:"40",
                color: "Negro",
                "ProductId": expect.any(String),
            }

        ]
    },
    {
        id: expect.any(String),
        name: "Producto cuatro",
        description: "Descripcion producto cuatro",
        images : [
                    "http://images1",
                    "http://images2",
                    "http://images3",
                    "http://images4"
        ],
        released: "2025-02-24",
        category: 6,
        discipline : 2,
        genre: 1,
        trademark : 2,
        variants : [
            {
                id:expect.any(String),
                order: 1,
                characteristics: "Características de la Variante 1",
                price: 19.99,
                stock: 100,
                images: [
                    "http://images1",
                    "http://images2",
                    "http://images3",
                    "http://images4"
                ],
                size:"38",
                color: "Blanco",
                "ProductId": expect.any(String),
            },
            {
                id:expect.any(String),
                order: 2,
                characteristics: "Características de la Variante 2",
                price: 19.99,
                stock: 50,
                images: [
                    "http://images1",
                    "http://images2",
                    "http://images3",
                    "http://images4"
                ],
                size:"40",
                color: "Negro",
                "ProductId": expect.any(String),
            }

        ]
    } */

//* ============================================

export const getByIdResponse = {
  id: expect.any(String),
  name: 'Producto uno',
  description: 'Descripcion producto uno',
  images: [
    'http://images1',
    'http://images2',
    'http://images3',
    'http://images4'
  ],
  released: '2025-02-24',
  enable: true,
  attributes: [
    {
      name: 'Hombre',
      type: 'Genre'
    },
    {
      name: 'Gala',
      type: 'Discipline'
    },
    {
      name: 'Trajes',
      type: 'Category'
    }
  ],
  trademark: {
    name: 'BILLABONG',
    metaTitle: 'soy metatitle',
    metaDescription: 'soy metadescription',
    metaKeywords: 'metakeywords',
    ogImage: 'urlImage',
    twitterCard: 'pepepep',
    logo: 'logo',
    officialWebsite: 'https://pepe.com',
    socialMedia: 'pepepe',
    brandStory: 'ididididid'
  },
  variants: [
    {
      ProductId: expect.any(String),
      characteristics: 'Características de la Variante 1',
      color: 'Blanco',
      images: [
        'http://images1',
        'http://images2',
        'http://images3',
        'http://images4'
      ],
      id: expect.any(String),
      order: 1,
      price: '19.99',
      size: '38',
      stock: 100
    },
    {
      ProductId: expect.any(String),
      characteristics: 'Características de la Variante 2',
      color: 'Negro',
      images: [
        'http://images1',
        'http://images2',
        'http://images3',
        'http://images4'
      ],
      id: expect.any(String),
      order: 2,
      price: '19.99',
      size: '40',
      stock: 50
    }
  ]
}
export const getByIdResponseByColor = { // color: Blanco
  id: expect.any(String),
  name: 'Producto uno',
  description: 'Descripcion producto uno',
  images: [
    'http://images1',
    'http://images2',
    'http://images3',
    'http://images4'
  ],
  released: '2025-02-24',
  enable: true,
  attributes: [
    {
      name: 'Hombre',
      type: 'Genre'
    },
    {
      name: 'Gala',
      type: 'Discipline'
    },
    {
      name: 'Trajes',
      type: 'Category'
    }
  ],
  trademark: {
    name: 'BILLABONG',
    metaTitle: 'soy metatitle',
    metaDescription: 'soy metadescription',
    metaKeywords: 'metakeywords',
    ogImage: 'urlImage',
    twitterCard: 'pepepep',
    logo: 'logo',
    officialWebsite: 'https://pepe.com',
    socialMedia: 'pepepe',
    brandStory: 'ididididid'
  },
  variants: [
    {
      ProductId: expect.any(String),
      characteristics: 'Características de la Variante 1',
      color: 'Blanco',
      images: [
        'http://images1',
        'http://images2',
        'http://images3',
        'http://images4'
      ],
      id: expect.any(String),
      order: 1,
      price: '19.99',
      size: '38',
      stock: 100
    }
  ]
}
export const getByIdResponseBySize = { // size: 40
  id: expect.any(String),
  name: 'Producto uno',
  description: 'Descripcion producto uno',
  images: [
    'http://images1',
    'http://images2',
    'http://images3',
    'http://images4'
  ],
  released: '2025-02-24',
  enable: true,
  attributes: [
    {
      name: 'Hombre',
      type: 'Genre'
    },
    {
      name: 'Gala',
      type: 'Discipline'
    },
    {
      name: 'Trajes',
      type: 'Category'
    }
  ],
  trademark: {
    name: 'BILLABONG',
    metaTitle: 'soy metatitle',
    metaDescription: 'soy metadescription',
    metaKeywords: 'metakeywords',
    ogImage: 'urlImage',
    twitterCard: 'pepepep',
    logo: 'logo',
    officialWebsite: 'https://pepe.com',
    socialMedia: 'pepepe',
    brandStory: 'ididididid'
  },
  variants: [
    {
      ProductId: expect.any(String),
      characteristics: 'Características de la Variante 2',
      color: 'Negro',
      images: [
        'http://images1',
        'http://images2',
        'http://images3',
        'http://images4'
      ],
      id: expect.any(String),
      order: 2,
      price: '19.99',
      size: '40',
      stock: 50
    }
  ]
}
/*  [
      {
        id: 'cc07023f-dd16-4801-823a-c291ee9d272b',
        name: 'Producto uno',
        description: 'Descripcion producto uno',
        images: [
          'http://images1',
          'http://images2',
          'http://images3',
          'http://images4'
        ],
        released: '2025-02-24',
        enable: true,
        attributes: [ [Object], [Object], [Object] ],
        trademark: { name: 'BILLABONG', logo: 'logo' },
        variants: [ [Object], [Object] ]
      },
      {
        id: '6baa196f-0752-4093-a3e4-bcea8b1166b7',
        name: 'Producto dos',
        description: 'Descripcion producto dos',
        images: [
          'http://images1',
          'http://images2',
          'http://images3',
          'http://images4'
        ],
        released: '2025-02-24',
        enable: true,
        attributes: [ [Object], [Object] ],
        trademark: { name: 'RIP CURL', logo: 'logo' },
        variants: [ [Object], [Object] ]
      }
    ] */
