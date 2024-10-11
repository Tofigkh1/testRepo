import { addData } from "../helper/addData";
import { deleteData } from "../helper/deleteData";
import { getAllData } from "../helper/getAllData";
import { getDataID } from "../helper/getDataID";
import { uptData } from "../helper/uptData";
import { Product } from "../models/Product";
import { response } from "../utils/response";

export async function handlerProductGET(req, res, col) {
  try {
    const { rest_id, search, category_id, ageSize } = req.query;

    if (rest_id) {
      const data = await getQueryData(col, "rest_id", rest_id);
      res.status(200).json(response(data));
      return;
    }

    if (category_id) {
      const data = await getQueryData(col, "category_id", category_id);
      res.status(200).json(response(data));
      return;
    }

    if (ageSize) {
      const data = await getQueryData(col, "ageSize", ageSize);
      res.status(200).json(response(data));
      return;
    }

    if (search) {
      const data = await getQueryData(col, "name", search, ">=");
      res.status(200).json(response(data));
      return;
    }

    const data = await getAllData(col);

    res.status(200).json(response(data));
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
}

export async function handlerProductGETID(req, res, col) {
  try {
    const { id } = req.query;

    const data = await getDataID(col, id);

    res.status(200).json(response(data));
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
}

export async function handlerProductPOST(req, res, col) {
  try {
    const { name, price, description, rest_id, img_url, cover_url, category_id, allDescription, ageSize } = req.body;

    const product = new Product(
      name,
      description,
      price,
      rest_id,
      img_url,
      cover_url,
      category_id,
      allDescription,
      ageSize // Yeni alanı ekledik
    ).toPlainObject();

    const data = await addData(col, product);
    res.status(201).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
}

export async function handlerProductPUT(req, res, col) {
  try {
    const { id } = req.query;
    const { name, price, description, rest_id, img_url, cover_url, category_id, allDescription, ageSize } = req.body;

    const product = new Product(
      name,
      description,
      price,
      rest_id,
      img_url,
      cover_url,
      category_id,
      allDescription,
      ageSize // Yeni alanı ekledik
    ).toPlainObject();

    const data = await uptData(col, id, product);
    res.status(200).json({ message: "Success", data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
}

export async function handlerProductDELETE(req, res, col) {
  try {
    const { id, ageSize } = req.query;

    await deleteData(col, id);

    res.status(204).json({ message: "Success", id, ageSize });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
}
