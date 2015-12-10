// jQuery CEP Correios v1.0
// GitHub: https://github.com/webmaniabr/jQuery-CEP-Correios
// Author: WebmaniaBR
// Author URI: webmaniabr.com
(function( $ ){
    
    correios = {
        init: function( app_key, app_secret ) {
            window.correios_app_key = app_key;
            window.correios_app_secret = app_secret;
        }
    }
    
   $.fn.correios = function( endereco, bairro, cidade, uf, loading ) {

       var err;
       if(typeof correios_app_key === 'undefined') { console.log('Informe o app_key da sua aplicação dos Correios.'); err = true; }
       if(typeof correios_app_secret === 'undefined') { console.log('Informe o app_secret da sua aplicação dos Correios.'); err = true; }
       if (err) return false;
       
       window.c_endereco = endereco;
       window.c_bairro = bairro;
       window.c_cidade = cidade;
       window.c_uf = uf;
       window.c_loading = loading;
       
       $(this).on('keyup', function(){
           
           cep = $(this).val().replace('.','').replace('-', '').replace('_', '');
           
           if (cep.length == 8){
               
                if(c_loading) $( c_loading ).show();
               
                $.getJSON( "https://webmaniabr.com/api/1/cep/"+cep+"/?app_key="+correios_app_key+"&app_secret="+correios_app_secret, function( data ) {

                    if (c_loading) $( c_loading ).hide();
                    if (c_endereco) $( endereco ).val( data.endereco );
                    if (c_bairro) $( bairro ).val( data.bairro );
                    if (c_cidade) $( cidade ).val( data.cidade );
                    if (c_uf) $( uf ).val( data.uf );

                });

           }
           
       });
       
       return this;
       
   }; 
})( jQuery );