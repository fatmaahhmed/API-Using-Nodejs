"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unhandledRejection = void 0;
exports.unhandledRejection = process.on("unhandledRejection", (error) => {
    console.log("################################");
    console.log("error in unhandledRejection");
    console.log("################################");
    console.error("Full error object:", error); // Log the entire error object
    console.log("################################");
    console.error(`Error details: ${error.stack}`);
    console.log("################################");
    console.log(error.name, error.message);
    console.log("################################");
    process.exit(1);
});
