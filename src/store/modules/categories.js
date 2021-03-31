import crm from "./crm";
import api from "@/plugins/api"

export default {
  namespaced: true,
  state: {
     categories: null,
  /*  [
      {
        name: 'looks',
        description: 'образы',
        subcategories: []
      },
      {
        name: 'novelty',
        description: 'новинки',
        subcategories: [
          {
            name: 'jeans',
            description: 'джинсы',
            goods: [
              {
                brand: 'itemJeans',
                price: '1199',
                sizes: [
                  40, 42, 44
                ],
                images: [
                  'https://cdn1.ozone.ru/s3/multimedia-4/wc1200/6018112936.jpg',
                  'https://cdn1.ozone.ru/s3/multimedia-h/wc1200/6018112913.jpg',
                  'https://cdn1.ozone.ru/s3/multimedia-s/wc1200/6018112924.jpg',
                  'https://cdn1.ozone.ru/s3/multimedia-k/wc1200/6018112916.jpg',
                  'https://cdn1.ozone.ru/s3/multimedia-q/wc1200/6018112922.jpg',
                ]
              },
              {
                brand: 'itemJeans',
                price: '1199',
                sizes: [
                  40, 42, 44
                ],
                images: [
                  'https://cdn1.ozone.ru/s3/multimedia-7/wc1200/6018112939.jpg',
                  'https://cdn1.ozone.ru/s3/multimedia-r/wc1200/6018112923.jpg',
                  'https://cdn1.ozone.ru/s3/multimedia-j/wc1200/6018112915.jpg',
                  'https://cdn1.ozone.ru/s3/multimedia-v/wc1200/6018112927.jpg',
                  'https://cdn1.ozone.ru/s3/multimedia-0/wc1200/6018112932.jpg',
                ]
              },
              {
                brand: 'itemJeans',
                price: '1199',
                sizes: [
                  40, 42, 44
                ],
                images: [
                  'https://cdn1.ozone.ru/s3/multimedia-8/wc1200/6018112904.jpg',
                  'https://cdn1.ozone.ru/s3/multimedia-u/wc1200/6018112890.jpg',
                  'https://cdn1.ozone.ru/s3/multimedia-s/wc1200/6018112888.jpg',
                  'https://cdn1.ozone.ru/s3/multimedia-w/wc1200/6018112892.jpg',
                  'https://cdn1.ozone.ru/s3/multimedia-v/wc1200/6018112891.jpg',
                ]
              },
              {
                brand: 'itemJeans',
                price: '1199',
                sizes: [
                  40, 42, 44
                ],
                images: [
                  'https://cdn1.ozone.ru/s3/multimedia-o/wc1200/6021681888.jpg',
                  'https://cdn1.ozone.ru/s3/multimedia-3/wc1200/6021681867.jpg',
                  'https://cdn1.ozone.ru/s3/multimedia-9/wc1200/6021681873.jpg',
                  'https://cdn1.ozone.ru/s3/multimedia-h/wc1200/6021681881.jpg',
                  'https://cdn1.ozone.ru/s3/multimedia-n/wc1200/6021681887.jpg'
                ]
              },
              {
                brand: 'itemJeans',
                price: '1099',
                sizes: [
                  40, 42, 44
                ],
                images: [
                  'https://cdn1.ozone.ru/s3/multimedia-t/wc1200/6021390293.jpg',
                  'https://cdn1.ozone.ru/s3/multimedia-k/wc1200/6021390284.jpg',
                  'https://cdn1.ozone.ru/s3/multimedia-o/wc1200/6021390288.jpg',
                  'https://cdn1.ozone.ru/s3/multimedia-l/wc1200/6021390285.jpg',
                  'https://cdn1.ozone.ru/s3/multimedia-q/wc1200/6021390290.jpg'
                ]
              },
            ]
          },
          {
            name: 'pants',
            description: 'брюки',
            goods: [
              {
                brand: 'Твое',
                price: '449',
                sizes: [
                  42, 44, 46, 48, 50
                ],
                images: [
                  'https://cdn1.ozone.ru/s3/multimedia-5/wc1200/6017806721.jpg',
                  'https://cdn1.ozone.ru/s3/multimedia-m/wc1200/6017806738.jpg',
                  'https://cdn1.ozone.ru/s3/multimedia-n/wc1200/6017806739.jpg'

                ]
              },
              {
                brand: 'LOVE REPUBLIC',
                price: '1320',
                sizes: [
                  40, 42, 44, 46, 48
                ],
                images: [
                  'https://cdn1.ozone.ru/s3/multimedia-u/wc1200/6014753046.jpg',
                  'https://cdn1.ozone.ru/s3/multimedia-k/wc1200/6014753036.jpg',
                  'https://cdn1.ozone.ru/s3/multimedia-h/wc1200/6014753033.jpg',
                  'https://cdn1.ozone.ru/s3/multimedia-o/wc1200/6014753040.jpg',
                  'https://cdn1.ozone.ru/s3/multimedia-t/wc1200/6014753045.jpg',
                ]
              },
              {
                brand: 'LOVE REPUBLIC',
                price: '1715',
                sizes: [
                  40, 42, 44, 46, 48
                ],
                images: [
                  'https://cdn1.ozone.ru/s3/multimedia-1/wc1200/6010363645.jpg',
                  'https://cdn1.ozone.ru/s3/multimedia-x/wc1200/6010363641.jpg',
                  'https://cdn1.ozone.ru/s3/multimedia-w/wc1200/6010486940.jpg',
                  'https://cdn1.ozone.ru/s3/multimedia-z/wc1200/6010486943.jpg',
                  'https://cdn1.ozone.ru/s3/multimedia-0/wc1200/6010486944.jpg',
                ]
              },
              {
                brand: 'LOVE REPUBLIC',
                price: '1437',
                sizes: [
                  40, 42, 44, 46, 48
                ],
                images: [
                  'https://cdn1.ozone.ru/s3/multimedia-v/wc1200/6008967883.jpg',
                  'https://cdn1.ozone.ru/s3/multimedia-h/wc1200/6008967869.jpg',
                  'https://cdn1.ozone.ru/s3/multimedia-s/wc1200/6008968204.jpg',
                  'https://cdn1.ozone.ru/s3/multimedia-4/wc1200/6008968216.jpg',
                  'https://cdn1.ozone.ru/s3/multimedia-z/wc1200/6008968211.jpg',
                ]
              },
              {
                brand: 'LOVE REPUBLIC',
                price: '1437',
                sizes: [
                  40, 42, 44, 46, 48
                ],
                images: [
                  'https://cdn1.ozone.ru/s3/multimedia-8/wc1200/6008968220.jpg',
                  'https://cdn1.ozone.ru/s3/multimedia-1/wc1200/6008968213.jpg',
                  'https://cdn1.ozone.ru/s3/multimedia-q/wc1200/6008968202.jpg',
                  'https://cdn1.ozone.ru/s3/multimedia-0/wc1200/6008968212.jpg',
                  'https://cdn1.ozone.ru/s3/multimedia-x/wc1200/6008968209.jpg',
                ]
              },
              {
                brand: 'LOVE REPUBLIC',
                price: '1437',
                sizes: [
                  40, 42, 44, 46, 48
                ],
                images: [
                  'https://cdn1.ozone.ru/s3/multimedia-3/wc1200/6008030163.jpg',
                  'https://cdn1.ozone.ru/s3/multimedia-w/wc1200/6008030156.jpg',
                  'https://cdn1.ozone.ru/s3/multimedia-r/wc1200/6008030151.jpg',
                  'https://cdn1.ozone.ru/s3/multimedia-1/wc1200/6008030161.jpg',
                  'https://cdn1.ozone.ru/s3/multimedia-v/wc1200/6008030155.jpg',
                ]
              },
            ]
          },
          {
            name: 'outerwear',
            description: 'Верхняя одежда',
            goods: [
              {
                brand: 'Парка HEIDEN',
                price: '6290',
                sizes: [
                  44, 46, 48, 50, 52
                ],
                images: [
                  'https://cdn1.ozone.ru/s3/multimedia-l/wc1200/6020179893.jpg',
                  'https://cdn1.ozone.ru/s3/multimedia-o/wc1200/6020179896.jpg',
                  'https://cdn1.ozone.ru/s3/multimedia-c/wc1200/6020179884.jpg',
                  'https://cdn1.ozone.ru/s3/multimedia-i/wc1200/6020179890.jpg'

                ]
              },
              {
                brand: 'Куртка LOVE REPUBLIC',
                price: '6290',
                sizes: [
                  44, 46, 48, 50, 52
                ],
                images: [
                  'https://cdn1.ozone.ru/s3/multimedia-s/wc1200/6021023200.jpg',
                  'https://cdn1.ozone.ru/s3/multimedia-q/wc1200/6021023198.jpg',
                  'https://cdn1.ozone.ru/s3/multimedia-d/wc1200/6021023185.jpg',
                  'https://cdn1.ozone.ru/s3/multimedia-h/wc1200/6021023189.jpg',
                  'https://cdn1.ozone.ru/s3/multimedia-p/wc1200/6021023197.jpg',
                  'https://cdn1.ozone.ru/s3/multimedia-r/wc1200/6021023199.jpg',
                  'https://cdn1.ozone.ru/s3/multimedia-l/wc1200/6021023193.jpg'

                ]
              },
              {
                brand: 'Плащ LOVE REPUBLIC',
                price: '5975',
                sizes: [
                  40, 42, 44, 46, 48
                ],
                images: [
                  'https://cdn1.ozone.ru/s3/multimedia-d/wc1200/6019098697.jpg',
                  'https://cdn1.ozone.ru/s3/multimedia-y/wc1200/6019098682.jpg',
                  'https://cdn1.ozone.ru/s3/multimedia-9/wc1200/6019098693.jpg',
                  'https://cdn1.ozone.ru/s3/multimedia-2/wc1200/6019098686.jpg',
                  'https://cdn1.ozone.ru/s3/multimedia-3/wc1200/6019098687.jpg',
                  'https://cdn1.ozone.ru/s3/multimedia-w/wc1200/6019098680.jpg'

                ]
              },
            ]
          },
          {
            name: 'jumpers_sweaters_cardigans',
            description: 'Джемперы, свитеры и кардиганы',
          },
          {
            name: 'underclothes',
            description: 'Нижнее белье',
          },
          {
            name: 'jackets_and_costumes',
            description: 'пиджаки и костюмы',
          },
          {
            name: 'dresses_and_sundresses',
            description: 'платья и сарафаны',
          },
          {
            name: 'hoodies_and_sweatshirts',
            description: 'толстовки и свитшоты',
          },
          {
            name: 't-shirts_and_polos',
            description: 'футболки и поло',
          },
          {
            name: 'skirts',
            description: 'юбки',
          },
        ]
      },
      {
        name: 'clothes',
        description: 'одежда',
        subcategories: [
          {
            name: 'blouses_and_shirts',
            description: 'блузы и рубашки',
          },
          {
            name: 'pants',
            description: 'брюки',
          },
          {
            name: 'outerwear',
            description: 'верхняя одежда',
          },
          {
            name: 'knitted_suits',
            description: 'вязаные костюмы',
          },
          {
            name: 'jumpers_sweaters_and_cardigans',
            description: 'джемперы, свитеры и кардиганы',
          },
          {
            name: 'jeans',
            description: 'джинсы',
          },
          {
            name: 'home_clothes',
            description: 'домашняя одежда',
          },
          {
            name: 'overalls',
            description: 'комбенизоны',
          },
        ]
      },
      {
        name: 'shoes',
        description: 'обувь',
        subcategories: [
          {
            name: 'ankle_boots',
            description: 'ботильоны',
          },
          {
            name: 'boots',
            description: 'ботинки',
          },
          {
            name: 'slippers',
            description: 'домашняя обувь',
          },
          {
            name: 'sneakers',
            description: 'кроссовки',
          },
          {
            name: 'shoes',
            description: 'туфли',
          },
        ]
      },
      {
        name: 'accessories',
        description: 'аксессуары',
        subcategories: [
          {
            name: 'handkerchiefs',
            description: 'платки',
          },
          {
            name: 'belts',
            description: 'ремни',
          },
          {
            name: 'bags',
            description: 'сумки',
          },
          {
            name: 'backpacks',
            description: 'рюкзаки',
          },
          {
            name: 'suitcases_and_travel_bags',
            description: 'чемоданы и дорожные сумки',
          },
        ]
      },
    ],*/
    currentProduct: {},
  },
  getters: {
    categories: ({categories}) => categories,
    getCurrentCategory: ({categories}) => (name) => categories.find(category => category.name === name),
    getCurrentSubcategory: () => (category, subcategoryName) => {
      return category.
      subcategories.
      find(subcategory => subcategory.name === subcategoryName);
    },
    getCurrentProduct: ({currentProduct}) => currentProduct,
  },
  mutations: {
    SET_CATEGORIES(state, response) {
      state.categories = response;
    },
    SET_CURRENT_PRODUCT(state, product) {
      state.currentProduct = product
    },
    CHANGE_CATEGORY(state, {name, description, index}) {
      console.log(state.categories, name, description, index);
      state.categories[index].name = name;
      state.categories[index].description = description;
    },
    CHANGE_SUBCATEGORY(state, {name, description, index, categoryIndex}) {
      console.log(state.categories, name, description, index, categoryIndex);
      state.categories[categoryIndex].subcategories[index].name = name;
      state.categories[categoryIndex].subcategories[index].description = description;
    },
    CHANGE_DETAIL(state, {newData, keyOfData, goodIndex, subcategoryIndex, categoryIndex}) {
      console.log(newData, keyOfData, goodIndex, subcategoryIndex, categoryIndex);
      state.
        categories[categoryIndex].
        subcategories[subcategoryIndex].
        goods[goodIndex][keyOfData] = newData;
    },
    CHANGE_DETAIL_IN_ARRAY(state, {newData, keyOfData, itemIndex, goodsItemIndex, subcategoryIndex, categoryIndex}) {
      console.log(newData, keyOfData, goodsItemIndex, subcategoryIndex, categoryIndex);
      state.
        categories[categoryIndex].
        subcategories[subcategoryIndex].
        goods[goodsItemIndex][keyOfData].splice(itemIndex, 1, newData)
    },
    ADD_CATEGORY(state, {name, description, index}) {
      const path = state.categories;
      if(index === -1 || index > path.length) {
        index = path.length
      }
      path.splice(index, 0,
        {
          name,
          description,
          subcategories: []
        });
    },
    ADD_SUBCATEGORY(state, {name, description, index, categoryIndex}) {
      const path = state.categories[categoryIndex].subcategories;
      if(index === -1 || index > path.length) {
        index = path.length
      }
      path.splice(index, 0,
        {
          name,
          description,
          goods: []
        });
    },
    ADD_GOODS(state, {goodsItem, index, categoryIndex, subcategoryIndex}) {
      const path = state.categories[categoryIndex].subcategories[subcategoryIndex].goods;
      if(index === -1 || index > path.length) {
        index = path.length
      }
      path.splice(index, 0, goodsItem);
    },
    DELETE_CATEGORY(state, {index}) {
      state.categories.splice(index, 1)
    },
    DELETE_SUBCATEGORY(state, {index, categoryIndex}) {
      state.categories[categoryIndex].subcategories.splice(index, 1)
    },
    DELETE_GOODS_ITEM(state, {goodsItemIndex, subcategoryIndex, categoryIndex}) {
      state.categories[categoryIndex].subcategories[subcategoryIndex].goods.splice(goodsItemIndex, 1)
    },
    ADD_SIZE(state, {size, goodsItemIndex, subcategoryIndex, categoryIndex}) {
      const goodsItemPath = state.categories[categoryIndex].subcategories[subcategoryIndex].goods[goodsItemIndex];
      const sizesPath = goodsItemPath.sizes;
      const duplicate = sizesPath.find(curSize => curSize === size) === size;
      if(!duplicate) {
        goodsItemPath.sizes = (sizesPath.concat(size)).sort((prev, next) => prev - next);
      }
    },
    ADD_PHOTO(state, {image, goodsItemIndex, subcategoryIndex, categoryIndex}) {
      const goodsItemPath = state.categories[categoryIndex].subcategories[subcategoryIndex].goods[goodsItemIndex];
      const imagesPath = goodsItemPath.images;
      const duplicate = imagesPath.find(curImage => curImage === image) === image;
      if(!duplicate) {
        goodsItemPath.images = imagesPath.concat(image);
      }
    },

    DELETE_DETAIL_IN_ARRAY(state, {keyOfData, itemIndex, goodsItemIndex, subcategoryIndex, categoryIndex}) {
      state.
        categories[categoryIndex].
        subcategories[subcategoryIndex].
        goods[goodsItemIndex][keyOfData].splice(itemIndex, 1)
    }
  },
  actions: {
    setCurrentProduct({commit, getters}, {categoryName, subcategoryName, productId}) {
      const category = getters.getCurrentCategory(categoryName);
      const subcategory = getters.getCurrentSubcategory(category, subcategoryName);
      const product = subcategory.goods[productId];
      commit('SET_CURRENT_PRODUCT', product);
    },
    async loadCategories({commit}) {
      const response = await api.get('/query');
      commit('SET_CATEGORIES', response.data.categories);
    }
  },
  modules: {
    crm
  }
}
