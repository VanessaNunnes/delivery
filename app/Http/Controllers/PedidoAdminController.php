<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Pedido;
use DB;

class PedidoAdminController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view("PedidoAdmin/index");
    }

    /**
     * Retorna a lista de todos os pedidos do banco de dados no formato JSON
     *
     * @return \Illuminate\Http\Response
     */
    public function getPedidos(){
        // Lebrar de dar o use App\Models\Pedido;
        $pedidos = Pedido::all();
        $response["success"] = true;
        $response["message"] = "Consulta de Pedidos realizada com sucesso";
        $response["return"] = $pedidos;
        return response()->json($response, 200);
    }

    /**
     * Retorna a lista de todos os tipos de produto do banco de dados no formato JSON
     *
     * @return \Illuminate\Http\Response
     */
    public function getTipoProdutos(){
        // Lebrar de dar o use App\Models\Pedido;
        $tipoProdutos = DB::select('SELECT * FROM Tipo_Produtos');
        $response["success"] = true;
        $response["message"] = "Consulta de Pedidos realizada com sucesso";
        $response["return"] = $tipoProdutos;
        return response()->json($response, 200);
    }

    /**
     * Retorna a lista de todos os tipos de produto do banco de dados no formato JSON
     *
     * @return \Illuminate\Http\Response
     */
    public function getPedidoProdutos($id){
        // Lebrar de dar o use App\Models\Pedido;
        $pedidoProdutos = DB::select("SELECT Tipo_Produtos.descricao,
                                           Produtos.nome,
                                           Pedido_Produtos.quantidade,
                                           Produtos.preco
                                    FROM Pedido_Produtos
                                    JOIN Produtos on Pedido_Produtos.Produtos_id = Produtos.id
                                    JOIN Tipo_Produtos on Produtos.Tipo_Produtos_id = Tipo_Produtos.id
                                    WHERE Pedidos_id = ?", [$id]);
        $response["success"] = true;
        $response["message"] = "Consulta de Produtos dentro de Pedido realizada com sucesso";
        $response["return"] = $pedidoProdutos;
        return response()->json($response, 200);
    }

    public function getPedidoStatus(){
        // Lebrar de dar o use App\Models\Pedido;
        $pedidoStatus = Pedido::all();
        $response["success"] = true;
        $response["message"] = "Consulta de Pedidos realizada com sucesso";
        $response["return"] = $pedidoStatus;
        return response()->json($response, 200);
    }

    public function getStatusPedido(Request $request, $id){
        try {
            $statusPedido = Pedido::find($id);
            if (isset($statusPedido)) {
                $statusPedido->status = $request->status;
                $statusPedido->update();
               return response()->json(['Status do pedido atualizado com sucesso']);
            } else {
                return response()->json([ 'Pedido não encontrado'], 404);
            }
        } catch (\Throwable $th) {
            return response()->json([ $th->getMessage()], 500);
        }
    }

}
