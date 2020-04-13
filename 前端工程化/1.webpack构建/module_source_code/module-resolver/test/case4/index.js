require.ensure('./a')
    .then(module => {
        console.log(module);
    });