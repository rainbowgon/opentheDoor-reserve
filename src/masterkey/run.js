import check from "./check.js";
import reserve from "./reserve.js";

const run = async (info) => {
  const reservationResult = await reserve(info);

  if (!reservationResult) {
    return false;
  }

  return await check(info);
};
