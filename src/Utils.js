export const isEmpty = (value) => {
  // console.log("value")
  // console.log(value)
    return (
      value === undefined ||
      value === null ||
      (typeof value === "object" && Object.keys(value).length === 0) ||
      (typeof value === "string" && value.trim().length === 0)
    );
  };
  