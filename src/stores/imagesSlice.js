import { createSlice } from '@reduxjs/toolkit'
import ImagesApi from '../modules/api/ImagesApi'

const initialState = {
  images: {},
  loading: false,
}

const imagesSlice = createSlice({
  name: 'images',
  initialState,
  reducers: {
    setImages(state, action) {
      state.images = action.payload
      state.loading = false
    },
    setLoading(state, action) {
      state.loading = action.payload
    },
  },
})

export const fetchImages = () => {
  return async (dispatch, getState) => {
    const state = getState()
    const productsRedux = state.products.products
    const imagesApi = ImagesApi()

    dispatch(setLoading(true))

    if (productsRedux.length > 0) {
      try {
        const imagePromises = productsRedux.map(async (product) => {
          const result = await imagesApi.getImage(product.fantasyName)
          return {
            [product.productUuid]:
              result.length > 0 ? result[0].urls.small : '',
          }
        })

        const resolvedImages = await Promise.all(imagePromises)
        const imagesMap = Object.assign({}, ...resolvedImages)

        dispatch(setImages(imagesMap))
      } catch (error) {
        console.error('Error al obtener imágenes:', error)
        dispatch(setLoading(false))
      }
    } else {
      dispatch(setLoading(false))
    }
  }
}

export const { setImages, setLoading } = imagesSlice.actions
export default imagesSlice.reducer
