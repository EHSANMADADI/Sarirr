

async function getFile({url, name}){
    let response = await fetch(url);
    let data = await response.blob();

    console.log('blob', data);

    let options = {
        type: data.type //'image/jpeg'
    }
    let file = new File([data], name, options)

    return file
}

async function UploadSrImage({fidelity, image, base}) {
    let data = new FormData()

    console.log('image', image);
    data.append('image', image)
    data.append('fidelity_weight', fidelity)


    let response = await fetch(base + '/restore', {method: "POST", body: data});
    let result = await response.text()

    return result
}

await UploadSrImage({
    fidelity: '0.7',
    image: await getFile({
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxJYIiLqsI5nrcIpJOSoESr9L5PXAVQGsKpA&s',
        name: 'face.jpeg'
    }),
    base: 'http://192.168.4.177:17017'
})