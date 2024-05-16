import http from "k6/http";
import { sleep, check } from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export const options = {
    vus: 50,
    // iterations: 100,
    duration: '1m'
};

let endpoint = '/dimension/31730/items/properties?scenario_id=13146';

export default function () {
    const url = `https://gamma.api.blox.so${endpoint}`;

    const headers = {
        'Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxMDE1NiwiZXhwIjoxNzE2MzM3ODQyfQ.CV5sOdzdvWWiruMSTXlq14IBFnBggo6IWVuO9SZnrl0'
        // 'Cookie': 'session=.eJxFT1tvgjAY_S99FtIPSgHfHDMTNrpAMiS-GKp1Fli9UAN22X9f3cteTnJyLjnnG13F5SYGvZV7NEd7aA5xTKgTAucOAYqdGFvgHPuU0gjTJkKz_4zaavkl0BxC8H0_iCihQeSGHg5mSJ86oWynuGdY1Av5LrPXCgr5lmRH_rJ78PTDpMBkFrvWBDuvutde36Xtacqfl1YY5aY-jg_OzNIw8znlbT4eCtdUY3Imcdm1tF8l6_J8UbhJp6HcMM_069UTcxTRWjWLws69DeL69w8wBPTnF21VTME.Zh9uXQ.bLaBHxlFjAx6m7zzFWu_1bNk-AY'
    }

    const response = http.get(url, { headers });
    // check(response, {
    //     'success should be': (r) => console.log(r)
    //     // 'success should be': (r) => JSON.parse(r.body).success === true
    // })

    check(response, {
        'status 200': (r) => r.status === 200,
      });
    sleep(1)
}

export function handleSummary(data) {
    // const key = `${endpoint.split('/').join('_')}_result_${options.vus ? options.vus.toString() : '1'}_vus_${options.duration ? options.duration.toString() : 'max'}_duration_${options.iterations ? options.iterations.toString() : 'max'}_iterations.html`
    const key = "summery-" + (Math.floor(new Date().getTime() / 1000)).toString() + ".html"
    return {
        [key]: htmlReport(data),
    };
}