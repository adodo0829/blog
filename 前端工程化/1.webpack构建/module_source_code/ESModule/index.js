setTimeout(function() {
  require.ensure('./moduleA')
    .then(content => {
      console.log(content);
    });
}, 5000);
