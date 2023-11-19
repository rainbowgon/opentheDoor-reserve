import { createBrowser, createPage } from "../tools/browser.js";

const check = async ({
  targetUrl,
  themeTitle,
  targetDate,
  targetTime,
  bookerName,
  bookerPhoneNumber,
}) => {
  const browser = await createBrowser();
  const page = await createPage(browser);

  try {
    await Promise.all([page.waitForNavigation(), page.goto(targetUrl)]);

    await Promise.all([
      page.waitForSelector(".modal-content", { visible: true }),
      page.waitForSelector("input[name='chk_user_name']"),
      page.waitForSelector("input[name='chk_user_phone']"),
      page.click("a#booking_check_btn"),
    ]);

    await page.type("input[name='chk_user_name']", bookerName);
    await page.type("input[name='chk_user_phone']", bookerPhoneNumber);
    await page.click("button#booking_check_ajax");

    await page.waitForSelector("#booking_check_result > table > tbody");
    const [tbody] = await page.$x("//*[@id='booking_check_result']/table/tbody");

    const trs = await tbody.$x("//tr");

    for (let index = 0; index < trs.length; index += 2) {
      const fromSite = {};
      fromSite["date"] = await trs[index].$eval("td:nth-child(2)", (el) => el.textContent.trim());
      fromSite["themeTitle"] = await trs[index + 1].$eval("td:nth-child(1)", (el) =>
        el.textContent.trim()
      );
      const status = await trs[index + 1].$eval("td:nth-child(2)", (el) => el.textContent.trim());

      const fromUser = { themeTitle, targetDate, targetTime };

      if (isReserved(fromUser, fromSite, status)) {
        return true;
      }
    }

    return false;
  } catch (error) {
    console.log(error);
    return false;
  } finally {
    await page.close();
    await browser.close();
  }
};

check();

const isReserved = (fromUser, fromSite, status) => {
  if (
    fromUser.themeTitle == fromSite.themeTitle &&
    `${fromUser.targetDate} ${fromUser.targetTime}` == fromSite.date &&
    status == "예약됨"
  ) {
    return true;
  }
  return false;
};

export default check;
