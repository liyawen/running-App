'use strict';

let db = require('./model/db');

let fields = {
    distance: [2, 5],
    averagePace: [1, 3],
    averageCadence: [0.5, 3],
    fatigueIndex: [0.6, 1.4],
    healthIndex: [0.6, 1.4],
    landingStrike: [0, 3, true],
    landingPronation: [0, 3, true],
    landingPronationAngle: [-20, 20],
    impactPower: [10, 50],
    strideLength: [20, 100],
    xCOM: [0, 10],
    verticalMagnitude: [0, 10],
    energyUtilization: [0, 1],
    runTime: [0, 20],
    calorie: [0, 50]
};

let datas = [];
let rid = 1;
let map1 = ['frontHeelStrike','midFootStrike','backHeelStrike'];
let map2 = ['normalPronation','overPronation','underpronation'];

db.query(`select * from running_record where rid = ${rid}`).then(res => {
    let startTime = res[0].startTime - 0;
    let endTime = res[0].endTime - 0;
    console.log([startTime, endTime]);
    for (let i = startTime; i < endTime; i += 20) {
        let row = {
            rid: rid,
            id: 2,
            dataTime: i,
        };
        Object.keys(fields).forEach(field => {
            row[field] = random.apply(null, fields[field]);
        });
        row.landingStrike = map1[row.landingStrike];
        row.landingPronation = map2[row.landingPronation];
        datas.push(row);
    }

    let curDatas = [];
    while (datas.length) {
        if (datas.length > 4000) {
            curDatas.push(datas.slice(0, 4000));
            datas = datas.slice(4000);
        } else {
            curDatas.push(datas);
            datas = [];
        }
    }

    return db.query(`delete from receive_data where rid = ${rid}`).then(res => {
        console.log(`deleted ${res.affectedRows}`);
    }).then(() => {
        Promise.all(curDatas.map(datas => {
            return save(datas);
        }));
    }).then(() => {
        console.log('finish');
        db.end();
    }).catch(console.error);
}).catch(console.error);

function save(datas) {
    fields = Object.keys(datas[0]);
    let sql = `insert into receive_data (${fields.join(',')}) values`
        + datas.map(row => '(' + fields.map(field => '"' + row[field] + '"').join(',') + ')').join(',\n');
    return db.query(sql).then(res => {
        console.log(`successfully!!! affected ${res.affectedRows}`);
    }).catch(e => {
        console.error(e.sql);
    });
}

function random(left, right, isInt) {
    let size = right - left;
    let ret = Math.random() * size + left;
    if (isInt) {
        ret = parseInt(ret, 10);
    }
    return ret;
}
