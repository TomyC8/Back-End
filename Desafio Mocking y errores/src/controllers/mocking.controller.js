import { generateProduct } from '../../utils/faker.js'

import { productService } from '../../dao/services/product.service.js'

export const HandleGenerateProducts = async (req, res, next) => {
  try {
    const { quantity = 100 } = req.query

    for (let i = 0; i < quantity; i++) {
      const product = await generateProduct()
      await productService.create(product)
    }
    res.status(201).json({ status: 201, payload: 'success' })
  } catch (error) {
    next(error)
  }
}