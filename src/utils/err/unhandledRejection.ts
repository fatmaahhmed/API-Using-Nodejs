export const unhandledRejection = process.on(
  "unhandledRejection",
  (error: any) => {
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
  }
);
