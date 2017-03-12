/**
 * Created by jules on 12/03/17.
 */

export const pieData = [{
    "name": "30% (A)",
    "population": 30
}, {
    "name": "25% (B)",
    "population": 25
}, {
    "name": "20% (C)",
    "population": 20
}, {
    "name": "20% (D)",
    "population": 20
}, {
    "name": "5% (E)",
    "population": 5
}]

export const radarData = [{
    "30% (A)": 30,
    "25% (B)": 25,
    "20% (C)": 20,
    "20% (D)": 20,
    "5% (E)": 5,
}]

const chartData = [[
    [
        3600,
        29345.1739
    ],
    [
        7200,
        26410.4423
    ],
    [
        10800,
        21993.7
    ],
    [
        14400,
        25763.8
    ],
    [
        18000,
        22067.3333
    ],
    [
        21600,
        22642.5417
    ],
    [
        25200,
        26659.5306
    ]
]];

const extractedData = chartData[0].map((data) => {
    return data.map((n) => {
        return n / 3600;
    })
})

export const data = [extractedData]