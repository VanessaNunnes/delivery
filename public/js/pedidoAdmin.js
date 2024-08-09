// executa o JS depois de todo HTML ser carregado
$(document).ready(function () {
    // declaro a função
    function updatePedidos() {
        $.ajax({
            type: "GET",
            url: "/pedido/admin/getpedidos",
            data: null,
            dataType: "json",
            success: function (response) {
                printPedidos(response.return);
                $(".class-list-pedido").on("click", function () {
                    idPedido = this.getAttribute("value");
                    updatePedidoProdutos(idPedido);
                });
            },
            error: function (error) {
                console.log(error);
            }
        });
    }

    function updateStatusPedidos() {
        $.ajax({
            type: "GET",
            url: "/pedido/admin/getpedidostatus",
            data: null,
            dataType: "json",
            success: function (response) {
                $('#botao1').click(function() {
                    upadatePedidoStatus('R');
                  });
                
                  $('#botao2').click(function() {
                    upadatePedidoStatus('E');
                  });
                
                  $('#botao3').click(function() {
                    upadatePedidoStatus('C');
                  });
                
                  $('#botao4').click(function() {
                    upadatePedidoStatus('F');
                  });
            },
            error: function (error) {
                console.log(error);
            }
        });
    }

    function updatePedidoProdutos(idPedido){
        $.ajax({
            type: "GET",
            url: `/pedido/admin/getpedidoprodutos/${idPedido}`,
            data: null,
            dataType: "json",
            success: function (response) {
                console.log(response);
                $("#id-h2-pedido").html(`Pedido ${idPedido}`);
                const listPedidos = $("#list-produtos");
                listPedidos.html("");
                response.return.forEach(pedidoProduto => {
                    listPedidos.append(`<span class="list-group-item">
                                            ${pedidoProduto.descricao} - ${pedidoProduto.nome} - ${pedidoProduto.quantidade}x
                                            <div class="float-end">
                                                <i class="fa-solid fa-pencil-square"></i>
                                                <i class="fa-solid fa-trash"></i>
                                            </div>
                                        </span>
                                        `);
                });
            },
            error: function (error) {
                console.log(error);
            }
        });
    }

    function printPedidos(arrayPedidos) {
        const listPedidos = $("#list-pedidos");
        listPedidos.html("");
        arrayPedidos.forEach(pedido => {
            switch (pedido.status) {
                case 'A':
                    listPedidos.append(`<a value="${pedido.id}" href="#" class="list-group-item list-group-item-action class-list-pedido">Pedido ${pedido.id}</a>`);
                    break;
                case 'R':
                    listPedidos.append(`<a value="${pedido.id}" href="#" class="list-group-item list-group-item-action list-group-item-warning class-list-pedido">Pedido ${pedido.id}</a>`);
                    break
                case 'C':
                    listPedidos.append(`<a value="${pedido.id}" href="#" class="list-group-item list-group-item-action list-group-item-danger class-list-pedido">Pedido ${pedido.id}</a>`);
                    break;
                case 'E':
                    listPedidos.append(`<a value="${pedido.id}" href="#" class="list-group-item list-group-item-action list-group-item-primary class-list-pedido">Pedido ${pedido.id}</a>`);
                    break;
                case 'F':
                    listPedidos.append(`<a value="${pedido.id}" href="#" class="list-group-item list-group-item-action list-group-item-success class-list-pedido">Pedido ${pedido.id}</a>`);
                    break;
            }
        });
    }

function upadatePedidoStatus(status){
   var idPedidoAtual = idPedido;
   $.ajax({
    headers: {
      'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    },
    url: `/pedido/admin/getstatuspedido/${idPedidoAtual}`,
    type: 'PUT',
    data: { status: status },
    dataType: "json",
    success: function(response) {
      console.log(idPedidoAtual);
      console.log(response);
      console.log("O status do pedido foi atualizado!");
      location.reload();
    },
    error: function(error) {
      console.error(error);
    }
  });
}

    function updateTipoProdutosDropdown() {
        $.ajax({
            type: "GET",
            url: `/pedido/admin/gettipoprodutos`,
            data: null,
            dataType: "json",
            success: function (response) {
                console.log(response)
                printSelectTipoProdutos(response.return);
            },
            error: function (error) {
                console.log(error);
            }
        });
    }
    function printSelectTipoProdutos(arrayTipoProdutos) {
        const selectTipoProdutos = $('#id-select-tipo-produtos');
        selectTipoProdutos.html("");
        arrayTipoProdutos.forEach(tipoProduto => {
            selectTipoProdutos.append(`<option value="${tipoProduto.id}">${tipoProduto.descricao}</option>`);
        });
    }
    // chamo a função
    updatePedidos();
    updateStatusPedidos();
    // chamo a função
    updateTipoProdutosDropdown(); 
 
});
