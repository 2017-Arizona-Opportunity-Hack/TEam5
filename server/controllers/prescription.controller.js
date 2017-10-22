import {
  BaseController
} from "./base.controller";

export class PrescriptionController extends BaseController {
  constructor(server) {
    super(server);

    // Creates a prescription object
    this.router.post("/", (req, res) => {
      this.createPrescription(req, res).catch(err => {
        console.log("Error creating prescription object: ", err);
        this.sendServerError(res, "Error creating prescription object");
      });
    });

    // Retrieves all prescriptions
    this.router.get("/", (req, res) => {
      this.getAllPrescriptions(req, res).catch(err => {
        console.log("Error retrieving all prescriptions: ", err);
        this.sendServerError(res, "Error retrieving all prescriptions");
      });
    });

    // Retrieves prescription object with given id
    this.router.get("/:id", (req, res) => {
      this.getPrescriptionById(req, res).catch(err => {
        console.log("Error retrieving prescription object: ", err);
        this.sendServerError(res, "Error retrieving prescription object");
      });
    });

    // Updates prescription object with given id
    this.router.put("/:id", (req, res) => {
      this.updatePrescription(req, res).catch(err => {
        console.log("Error updating prescription object: ", err);
        this.sendServerError(res, "Error updating prescription object");
      });
    });

    // Deletes prescription object with given id
    this.router.delete("/:id", (req, res) => {
      this.deletePrescription(req, res).catch(err => {
        console.log("Error deleting prescription objects: ", err);
        this.sendServerError(res, "Error deleting prescription objects");
      });
    });

    this.router.all("/", (req, res) => {
      res.status(HttpStatus.METHOD_NOT_ALLOWED);
      res.send("Error 405 - Method not allowed");
    });

    this.router.all("/:id", (req, res) => {
      res.status(HttpStatus.METHOD_NOT_ALLOWED);
      res.send("Error 405 - Method not allowed");
    });

    this.router.get("/*", (req, res) => {
      res.status(HttpStatus.NOT_FOUND);
      res.send("Error 404 - Page not found")
    })
  }

  // route: GET /
  // Retrieves all prescription objects
  async getAllPrescriptions(req, res) {
    let data = await this.db.prescription.select.all().catch(this.throwError);
    this.sendResponse(res, this.HttpStatus.OK, true, data, "Success retrieving all prescriptions");
  }

  // route: POST /
  // Creates prescription object
  async createPrescription(req, res) {
    let data = {
      address: req.body.address,
      phone: req.body.phone
    };

    try {
      if (!data.address || !data.phone || typeof data.address != "string" || typeof data.phone != "string") {
        throw "Data invalid";
      }
      if (!data.phone.match(/^\([2-9]\d\d\) \d\d\d-\d{4}/)) {
        throw "Data invalid";
      }
    } catch (err) {
      this.sendResponse(res, this.HttpStatus.BAD_REQUEST, false, null, "Invalid data");
    }

    let qData = await this.db.prescription.insert.one(data).catch(this.throwError);
    this.sendResponse(res, this.HttpStatus.OK, true, qData, "Success retrieving all prescriptions");
  }

  // route: GET /:id
  // Retrieves prescription object with given id
  async getPrescriptionById(req, res) {
    let data = await this.db.prescription.select.byId(req.params.id).catch(this.throwError);
    this.sendResponse(res, this.HttpStatus.OK, true, data, "Success retrieving prescription");
  }

  // route: PUT /:id
  // Updates prescription object with given id
  async updatePrescription(req, res) {
    //   let data = await this.db.prescription.select.all().catch(this.throwError);
    //   this.sendResponse(res, this.HttpStatus.OK, true, data, "Success retrieving all prescriptions");
  }

  // route: DELETE /:id
  // Deletes prescription object with given id
  async deletePrescription(req, res) {
    //   let data = await this.db.prescription.select.all().catch(this.throwError);
    //   this.sendResponse(res, this.HttpStatus.OK, true, data, "Success retrieving all prescriptions");
  }
}