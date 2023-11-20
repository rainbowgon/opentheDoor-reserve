import { createBrowser, createPage } from "../tools/browser.js";

const reserve = async ({
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

    // 날짜 클릭, 해당 날짜 없는 경우 에러 발생
    await Promise.all([
      page.waitForSelector("#booking_list", { visible: true }),
      page.click(`#tab1 > div.box1 > div > div.date-click > div > p[data-dd='${targetDate}']`),
    ]);

    // 테마 선택, 해당 테마 없는 경우 에러 발생
    const [box2Inner] = await page.$x(
      `//div[@class='box2-inner' and descendant::div[@class='title' and contains(., '${themeTitle}')]]`
    );

    // 시간과 예약 상태 선택
    const [aTag] = await box2Inner.$x(`//div[@class='right']/p/a[contains(., '${targetTime}')]`);

    // 해당 시간 없는 경우, undefined 반환
    if (!aTag) {
      console.log("해당 시간대가 없습니다.");
      return false;
    }

    const isAvailable = await aTag.$eval("span", (el) => el.textContent.trim());

    // 이미 예약완료된 테마인 경우
    if (isAvailable == "예약완료") {
      console.log("이미 예약완료된 테마, 시간대입니다.");
      return false;
    }

    await Promise.all([
      page.waitForSelector(".modal-content", { visible: true }),
      page.waitForSelector("button#booking_go"),
      page.waitForSelector("input[name='user_name']"),
      page.waitForSelector("input[name='user_phone']"),
      aTag.click(),
    ]);

    await page.type("input[name='user_name']", bookerName);
    await page.type("input[name='user_phone']", bookerPhoneNumber);

    // 예약 버튼 클릭
    await page.click("button#booking_go");

    return true;
  } catch (error) {
    console.error(error);
    return false;
  } finally {
    await page.close();
    await browser.close();
  }
};

export default reserve;
