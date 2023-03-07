import http from 'k6/http';
import { check, group } from 'k6';

export default function () {
    group('Create user', function () {
        const payload = JSON.stringify({
            name: "morpheus",
            job: "leader"
        });

        const params = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const res = http.post('https://reqres.in/api/users', payload, params);


        check(
            res,
            {
                'response code was 201, Successfully': (res) => res.status == 201
            },
        );

    });

    group('Create update', function () {
        const payload = JSON.stringify({
            name: "morpheus",
            job: "zion resident"
        });

        const params = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const res = http.put('https://reqres.in/api/users/2', payload, params);

        check(
            res,
            {
                'response code was 200, Successfully': (res) => res.status == 200
            },
        );

    });

}