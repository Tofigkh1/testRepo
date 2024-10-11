import { addData } from "../helper/addData";
import { deleteData } from "../helper/deleteData";
import { getAllData } from "../helper/getAllData";
import { getDataID } from "../helper/getDataID";
import { getQueryData } from "../helper/getQueryData";
import { uptData } from "../helper/uptData";
import { verifyJWT } from "../utils/jwt";
import { response } from "../utils/response";

// Handler to get all records by ID
export async function handlerRecordsGET(req, res, col) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const idToken = authHeader.split(" ")[1];
    const decodedToken = verifyJWT(idToken);
    
    const records = await getQueryData(col, "user_id", decodedToken.userId);

    const formattedRecords = records.map(record => ({
      id: record.id,  // Only return the ID
    }));

    res.status(200).json(response(formattedRecords));
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
}

// Handler to get user-specific record by ID
export async function handlerUserRecordGET(req, res, col) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const idToken = authHeader.split(" ")[1];

  try {
    const decodedToken = verifyJWT(idToken);
    const records = await getQueryData(col, "user_id", decodedToken.userId);

    const formattedRecords = records.map(record => ({
      id: record.id,  // Only return the ID
    }));

    res.status(200).json(response(formattedRecords));
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
}

// Handler to add a new record
export async function handlerAddRecordPOST(req, res, col) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const idToken = authHeader.split(" ")[1];

  try {
    const decodedToken = verifyJWT(idToken);

    const { order_id } = req.body; // Receive only the record ID from the request

    const order = await getDataID(ROUTER.RECORDS, order_id);

    if (!record) {
      return res.status(404).json({ error: "Record not found!" });
    }

    // Only post the record ID
    const newRecord = {
      id: record.id,
      user_id: decodedToken.userId,
    };

    const data = await addData(col, newRecord);

    res.status(201).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
}

// Handler to delete a record and move it to history by ID
export async function handlerDeleteRecord(req, res, col) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const idToken = authHeader.split(" ")[1];

  try {
    const decodedToken = verifyJWT(idToken);
    const { record_id } = req.body;  // Receive the record ID from the request

    const record = await getDataID(col, record_id);

    if (!record) {
      return res.status(404).json({ error: "Record not found" });
    }

    // Only move the record by ID
    const movedRecord = {
      id: record.id,
      user_id: decodedToken.userId,
    };

    await addData("record_history", movedRecord);  // Move to history collection
    await deleteData(col, record_id);  // Delete the record by ID

    res.status(204).json({ message: "Success", record_id });
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
}
