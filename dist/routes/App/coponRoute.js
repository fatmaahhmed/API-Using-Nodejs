"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userProducts = exports.copon = void 0;
const coponController_1 = require("../../controllers/coponController");
const coponValidation_1 = require("../../utils/Validations/coponValidation");
const UserAndAdmin_1 = require("../../services/UserAndAdmin");
const express_1 = __importDefault(require("express"));
const verifyTokenWithOptionalRole_1 = require("../../middlewares/auth/verifyTokenWithOptionalRole");
exports.copon = express_1.default.Router();
const userProducts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.params.user_id) {
        const checkUserHasProduct = yield (0, UserAndAdmin_1.checkUserHasProducts)(+req.params.user_id);
        console.log("checkUserHasProduct", checkUserHasProduct);
        if (checkUserHasProduct == 0) {
            res.status(400).json({
                error: `You must have at least one product to add a copon`,
            });
            console.log("You must have at least one product to add a copon");
            return;
        }
        next();
    }
});
exports.userProducts = userProducts;
exports.copon.post("/", (0, verifyTokenWithOptionalRole_1.isAuthenticated)(), exports.userProducts, coponValidation_1.validatecopon, coponController_1.addCopon);
exports.copon.get("/:copon_id", (0, verifyTokenWithOptionalRole_1.isAuthenticated)(), coponController_1.getCopon);
exports.copon.get("/", (0, verifyTokenWithOptionalRole_1.isAuthenticated)(), coponController_1.getPaginatedCopons);
exports.copon
    .route("/:copon_id")
    .delete((0, verifyTokenWithOptionalRole_1.isAuthenticated)("Admin"), coponValidation_1.validateDeletecopon, coponController_1.deleteCopon)
    .put((0, verifyTokenWithOptionalRole_1.isAuthenticated)("Admin"), coponValidation_1.validatecoponUpdate, coponController_1.updateCopon);
exports.default = exports.copon;
