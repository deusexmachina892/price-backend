import { Product, ProductPrice } from '../database/models';
/**
 *
 *
 * @class ProductController
 */
class ProductController {
    /**
     * create one or many products
     *
     * @static
     * @param {object} req express request object
     * @param {object} res express response object
     * @param {object} next next middleware
     * @returns {json} json object with status and product data
     * @memberof ProductController
     */
    static async create(req, res, next) {
        if(req.body instanceof Array && req.body.length > 0) {
            const products = await Product.bulkCreate(req.body)
            return res.status(201).json({ success: true, products });
        } else {
            return res.status(400).json({
                success: false,
                message: 'No products to create'
            })
        }
        
    }

    /**
     * get all products
     *
     * @static
     * @param {object} req express request object
     * @param {object} res express response object
     * @param {object} next next middleware
     * @returns {json} json object with status and product data
     * @memberof ProductController
     */
    static async getAllProducts(req, res, next) {
      const { query } = req;
      const { page, limit, offset } = query
      const sqlQueryMap = {
        limit,
        offset,
      };
        const products = await Product.findAndCountAll(sqlQueryMap);
        return res.status(200).json({
          status: true,
          products,
        });
    }

/**
   * get single product details
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with status and product details
   * @memberof ProductController
   */
    static async getProduct(req, res, next) {
        return res.status(201).json({ msg: 'this works'});
    }

     /**
     * get all products prices
     *
     * @static
     * @param {object} req express request object
     * @param {object} res express response object
     * @param {object} next next middleware
     * @returns {json} json object with status and product data
     * @memberof ProductController
     */
    static async getAllPricesForProduct(req, res, next) {
            const { product_id } = req.params;

            const prices = await ProductPrice.findAll({
                where: { product_id },
                order: [
                    ['createdAt', 'DESC']
                ]
            },)
            return res.status(201).json({ success: true, prices });
        }

    /**
     * create prices with dates
     *
     * @static
     * @param {object} req express request object
     * @param {object} res express response object
     * @param {object} next next middleware
     * @returns {json} json object with status and product data
     * @memberof ProductController
     */
    static async createPrices(req, res, next) {
        const { product_id } = req.params;
        const { price } = req.body;

        if(!price) {
            return res.status(400).json({
                success: false,
                message: 'No price data provided'
            })
        }

        const productPrice = await ProductPrice.create({ product_id, price });

        if(productPrice) {
            await Product.update( {
                latest_price: price
            },
            {
                where: { product_id }
            })
        }

        return res.status(201).json({ success: true, productPrice });  
    }

}

export default ProductController;