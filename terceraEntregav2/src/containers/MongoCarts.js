import MongoManager from "./MongoManager.js";
import { cartsName, cartsSchema } from "../models/MongoSchemas.js";
import dotenv from 'dotenv';
dotenv.config()

class Cart extends MongoManager {
  constructor() {
    super(process.env.DATABASE_URI, cartsName, cartsSchema);
  }

  async createCart(userId) {
    this.setConnection();
    try {
      const cart = {
        userId: userId,
        items: [],
      };
      const response = await this.model.insertMany(cart);
      return response;
    } catch (error) {
      throw new Error("Error creating cart: " + error.message);
    }
  }

  async addItemToCart(cartId, productId, quantity) {
    this.setConnection();
    try {
      const cart = await this.getById(cartId);
      if (!cart) {
        throw new Error("Cart not found");
      }
      cart.items.push({ product: productId, quantity });
      const response = await this.updateElement(cartId, cart);
      return response;
    } catch (error) {
      throw new Error("Error adding item to cart: " + error.message);
    }
  }

  async removeItemFromCart(cartId, productId) {
    this.setConnection();
    try {
      const cart = await this.getById(cartId);
      if (!cart) {
        throw new Error("Cart not found");
      }
      cart.items = cart.items.filter(
        (item) => item.product.toString() !== productId.toString()
      );
      const response = await this.updateElement(cartId, cart);
      return response;
    } catch (error) {
      throw new Error("Error removing item from cart: " + error.message);
    }
  }

  async clearCart(cartId) {
    this.setConnection();
    try {
      const cart = await this.getById(cartId);
      if (!cart) {
        throw new Error("Cart not found");
      }
      cart.items = [];
      const response = await this.updateElement(cartId, cart);
      return response;
    } catch (error) {
      throw new Error("Error clearing cart: " + error.message);
    }
  }

  async getCartItems(cartId) {
    this.setConnection();
    try {
      const cart = await this.getById(cartId);
      if (!cart) {
        throw new Error("Cart not found");
      }
      return cart.items;
    } catch (error) {
      throw new Error("Error retrieving cart items: " + error.message);
    }
  }
}

export default Cart;