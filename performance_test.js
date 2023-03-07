import http from 'k6/http';
import { check, sleep, group } from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export const options = {
    vus: 1000,
    duration: '30s',

    thresholds: {
        http_req_duration: ['p(99)<2000'],
    },
};

export default function () {

    group('Create user', function () {
        sleep(1);
        const res = http.post('https://reqres.in/api/users');
        const payload = JSON.stringify({
            name: "morpheus",
            job: "leader"
        });

        const params = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const checkOutput = check(
            res,
            {
                'response code was 201, Create Successfully': (res) => res.status == 201
            },
        );

    });


    group('Update user', function () {
        sleep(1);
        const res = http.put('https://reqres.in/api/users/2');
        const payload = JSON.stringify({
            name: "morpheus",
            job: "zion resident"
        });

        const params = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const checkOutput = check(
            res,
            {
                'response code was 200, Update Successfully': (res) => res.status == 200
            },
        );

    });
}

export function handleSummary(data) {
    return {
        "summary2.html": htmlReport(data),
    };
}