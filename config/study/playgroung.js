const { decryptWithPrivateKey } = require('../../lib/cryptography/decrypt')
const decrypt = require('../../lib/cryptography/decrypt')
const fs = require('fs');

const data = [{
    __v: 0,
    about: 'F/geLG6ZtHXDUaUolP24MVSVnCVQWSiR5zCQSwhvRNb1bRp11VJPMXLzCCaWTNQclCH6j7160RarjgN2F2vp4cIrciQa6X9MkUHlFSJnsKRWDyev9xmLQA34q94otkgzAWe6mf+zCx8TGsmllG0zwPJI/hZHPLJHkp6XJIB8Ueai5xJHkLV9JiVu+XlOAzqPLsx+GGYi9eq88+Wmsg0Jc7d2nHVojRZBiKmhVZjdJGuNMhQ8hxXi+AJwoO5mihVG5qDH6nxVlxSfTIiOks02K/HA505LwF4oalC2cHX/mn5Ct7dDAONGEm36BXdWheygk695GAPqrNKJXs+cFZzrGA==',
    avatar: 'WGjxyg79JWMOEyIUbgpl8RYCjaU0rAocMx7BHUqV9pVDLfd8re7mr3/CFAcvylJJ+YFMQAJqIPuFxVBQfvwf/xAPMwa5OrDpEQXw4ClLjv495FuvqA+CVvAczQ3FWC6iprQgjpUzcSpz91K973ZKRdV1qb8SQQEJM403oRrpuV8/FW/PbMLG58Rul5cjc5XOhjqm7n+45ZknJtcZX7zq2U6MZA0I/gyGzrOd70r4gqpd1FcE/u/ykYbGt97AVKHFJyJHXeECVCitf+5l6CzOsEOpjUy/dzfxecVI7/rJ6wFWriYGsPaEPbQ7tju6rhYsG6Axo7qfPuXtXdQBLPbzeA==',
    coverImage: 'hdDCb3IFnQmdIST+R5pJGBkBwr06gd/e8DXkLUXL+ItIhxkhYnQB+WZn7VSWg9Mwgst4VIpwzY5fp9Tf9OIs3b3SVjoVD670XM591KdrJ2kujwWNzUDopijzFtkzpH1ngqpQ+acTnaJ4PxW9XqOv1bQnBrx/p0EPwCC6qsVP+ktQwq3l7IvmwfpI31IJDtsorhW3qCQwTLyPfUA2J5/Zn2bsvtDrm+nMB0cBboEezYxNmQJ9PCn7rO+6QR5lTQbaXUMJvUl14O+LdRPGKpZhOA4t35Enidx+iEqXT605u8jTg9tWz5rBMzEHgbQkoXRY2VDuQFPhcinB1RdJXcJSjg==',
    dateOfBirth: 'NpV1htbC+1DT8xp/cDenMVu9ZBlFUpX6Ucr5ryw+3rQb4l1o0Vqw9iDfBlE3ati5ByhiQnwJGdIpdcTzAcp3mpZdkVc9TMnk57Tba6KZK6bVTpQm9nB/17jaquONhpJYTTHKuR82uER1p/BWYaoSuGccKdQtV1Qv27OtPFfhjXkOyisx0Yats2iShSk/DDcOBMaNN74AFioDZguWxIlGyvSZpWuArNF8vif13Kh3j8uXIIo7ietJH8NeRoZdBk5uaYkjlhHAmsTAwVcfEwPO5d/feACC3LHTwhSNL3htpVnIqB+DVCUc2n+lslEKgqXZ113Sq7kd8W+NPisypZBjHA==',
    firstName: 'GO+gy2g2za3Ia31Tk4ChySshc8s3oOdVJmUU1jAPTiMlHJO5UDQ+3WHNZSYPaMeTzvK0XWUDinhjvskLpxZJpFlfqIB9sjk/N5HGk7DfaWkJSvd7wrJ7U1WCs+LxmGDIHNbzXqBlBBeNNVVbxMoP/uortkyYon0xGSfr2Pf0JNacxhhQTd+JiYaW4CJ6Prs3jeYdFyp/BOrLnDzbiTCzHVdocEbJhzr7yRD1DScWZF1DX7el4Yxb5e1j7KmDdXLU3rg5I/QJyPyWlDSG3dwD2LpKXBGuSda41a0ihAqTzzVO2HOo2VaNfRHkm6Wc5VBxOxKVzXwY1toGVUlrCNMKMg==',
    gender: 'cTvnmlrsBcMxqnCdMeccd+plLxLMCtQCVaTsNgOnuJI8aZQZJ9W9ZpKO+wBvw4drjDq41dcF/BZdW+AV/Y2GAvF4zlZy5JPfizFllA2zkXOOPBXQeFBUJDzoEuC1t88jHbd/HN/6VaVB21jzi5qtPsMP4E6EP1oI8722BExFmD5c1+rtw5KRLc7nirbD0Fujs5sgRFerdeFgJ+ZBrIGnwFt0wUV256TLB7tzn2qbLjT0XrMlcqOoLqJwApjMMXpmYvfSKJa6qzT5vpdHmsCfhoVqbri5dRWAGQQneOO1ShBCkXCiz2jIzawgp3qk4n+lAZXAFP4Ew4K5YcPiS48aMw==',
    lastName: 'vo2BpHOYfOSs5M4yup7XXoRN4Pq4MkWY4NHecrYxsFMf4MDH+4q3ocCp43A0WxCbwIBx7/zq0N3zX4NiiUGOlVKDe/j0fp0fk/NSuTyPQooAMuot9WaVhFJTtYC4tB9xz7A2FMjpCanh89h1l2JUwSuI/NNyRLlhuiurv7nQE9Pu1NFq73G2bbq3PSbVj3QTlxxCuFTyJ3sVz24aoypkkMxQBQcgefY0f6Em+OPO998Fd/2IbWDpb4816w5yZv2i+Z8kGjzgMoGoA38irBMxDuXrozEdsmpx2H5uu1itfwYxMfooSiCgrEli+qIuY+6Z/tB48cxfAO4BiudWv5G1kQ==',
    phone: 'vrrqpHEAUnLx+bn00uUKSiATJGb9YPHxVXfsPCAVNteKjva2rW/KxRU+2PdNZrFcR/J6X9wUW8jl/7Hh+J8s4v6BAAQnwxmkb1nqsRzJMnZexfphD4CSQhzi2yBLX/2cOQ7px1Y7YogyNDhcj3i8Z4WRHIE0QfAd+jYlhfBf59lNvG4RLtyCKQWPZyKDD0Cm6BiPHsChN5d6f85Lia0GW/gYSxEXbgtUOWS+APPkFHFF4L4PCoEzR8jgdJ9e1GUx9GOq+Tv9pF4k2j9+5em29M8LRAsyhjBAdUeXB4OVA+PlVHHJ++AGm96uP6n0PN/KGaYMx4YphUqavOic9UuxxQ==',
    address: [
        {
            __v: 0,
            address: 'DV4QCVBdgkNZ/pjx1KzSQCmiCWR5Cw751sh92ttR7rdcKTfx8yfrcYQo1rzvVsP47Qsmis2cFbSswhI+wf5iyZPFqkdp+r8E/HY9ja6EdvZpm8qATYSpQ1nX15nwofQnuxtlcagL60CCvRCxtguVnr+8fHPcsw8cwAQnABBmCLcA2jxrF//J5z/1PBH0qWPeyN/NKAVF5qaNDrwVSi35Vwoq/iJYydx4dLfWVS6PqnNSIy2fNnTPGuc8Tw0SVLnMojXpebjHSlVUvaUvpPSQNgis1LEihzeNKhJ2C9D6FsguIO3/76Gc8j26P+Ys7fGqJqogS3m1RxCdlM/KC6BZYQ==',
            postcode: 'ByOIMB5BQyFSd6cqeJlDgGoxk5HczbJJxxLdasMj5UBAVKkDhBZEDvocf/bh7i7yewFtvxKbN4vQRqORbLd6F/lrl5QEONP6VRtnnlmwi/p0ZJqppgCtWr8jL45ve1wSMgl1l6USKIilODNRfHUTqrjuTZxP/6+XIE0pUO530aqqHwH1nEZzDKZ3wmxDoPE74tAhoVw0TdAF5Q0Hk26OWWaAAQudqrqvq40GmdI0Z7qmsJfheI6z35QS5aRwT03OVFplV0aavf0tw+ZcuhW6DkuBA6r+U2uvqpkx9cNu3LtmntcmLCuRsg1WbdZFmGD66NNe/4SUEkZ53hogzb3XpA==',
            state: 'Rq2NL/TqCje1z2szjox/K9xpjzxBdKWj07TYUOSAdmr7oPqGFIEFj1iEzqdUhLeqgwvAXN01Lyphy4r9Yt+uij9QJNfFlZqTQcO5cK0h8i+1itOqD/8I/qYQPriqkRMkzNvwiuuwPT/Xho4kJPpiOMHF7Jaf4jm6BWInjOOTnlgZahj8gQx7kQGeyRzqm8zgRlGaOIo4nMoFmG8iWLbzVdbRdhwK8RIAtxHMje7nhWyko5JiLdcxRTrHMerebnJJpMiFgj5euxs3rsoYLRlAMDjjEwPVx7fw/g6YvUm+TTxAq3ms1ioDxTjGDuEgWIlBfBRhbI6Rm319WeoDtezjug==',
            suburb: 'H52eIy4fs1VopExRJj+087cN4qamBLgWulzCaor7u4Yhk4dW5dtql5gTaVR6a1hJ8fO1+CIjjj9fUfkI319w/tTTVWHfvDWQugNtqgCbMgY3PNRN3E1U9YdCkPF3sXuOVF+w4OGzzZvs+I4dDIPoA8G9pvz/mRT4lHu1KaVmN+QWN7uvcFpGrk+4jqIJ9tiuFNIBNj2Hr2TQHtP8MBo1K4dzYTJNpffrt+WNkvFaAtDui0pzGUWEuz6Ikj6QE/T6RbGygYMjM/yYGJth3z32K8ueWiDywe86/FbXZe/gqPACCOaW2xGrSIR9lj8WL45hiMvF+pxw3ZDNnrEwergWmQ=='
        }
    ]
}]



function parseData(data) {

    const parsedArray = [];
    const addr = data[0].address[0];
    const privateKey = fs.readFileSync('../../private-key.pem', 'utf-8');


    for (const key in data[0]) {
        if (key !== 'address' && key !== '__v') {
            const value = data[0][key];
            const arg = {}
            arg[key] = decryptValue(value)
            parsedArray.push(arg);
        }
    }

    for (const key in addr) {
        if (key != '__v') {
            const value = addr[key];
            const arg = {}
            arg[key] = decryptValue(value)
            parsedArray.push(arg);
        }
    }


    function decryptValue(value) {
        const encryptedData = Buffer.from(value, 'base64');
        const result = decrypt.decryptWithPrivateKey(privateKey, encryptedData)
        return result.toString('utf-8');
    }

    return parsedArray;
}



parseData(data)