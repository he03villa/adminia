<?php
require_once("../../jwt/vendor/autoload.php"); 
use \Firebase\JWT\JWT;



function generarToken($id) {

    $privateKey = <<<EOD
    -----BEGIN RSA PRIVATE KEY-----
    MIIEowIBAAKCAQEAx949+pTzEG0XycuWomlEd1OAkIzex1SdjTisYGsHXLY04kCp
    b9iStHWFH8ehjOqbBi6/KiTjq5dPg3lMuPECnQvgfNKN8xDzs7rIRX7ZfQLbFAaw
    g8B1U/ZPc4DIRVq0ueeeyWrpmGc7jgwT3vfGXrnSRbp9cJM4IYPOTL4KaEHcfHgE
    lLXxr6plZtH5xbM5PyYX8XAYRjBspfuJg8WiYsBrTlox5nMcu8XfJ9aaRMh78YWr
    Hm+/xVUUmfL9ykV1knfd2k/ODEtrZEGff7qpH20yDUp8/RCNclGwPECl9272k+eT
    NEmkBn+uBoSi1l11ypY6r7Z3IBbtdmylRAXWiwIDAQABAoIBACCON8RATNNJIc3R
    5qhvwyI4rMFe4M7RHpSpPZK6/EkCuNx9sduxCDxyxAtoJg1hDX1VUfgYaClEDUSa
    FoAtacKQ87EBTvPfuAJ3kzWWsvBk7bB2YnwjdjkF7u0edgCuBLAfZULjskcL0ayS
    lQ4Fh/9X/0MyXEphAIyc/paLggB3J9ku92XnJca+IYXCaA/bllzyvgEzJ5VtHawb
    5zjqgIud10p5HMM77SAcPXTKOx7oTqbEWu1C+tbb3dEgB8olRABoxsjT1XinxkJt
    YOM9R/CSX15AqIWVj+jlFjqy4OwidFxac8rgF0Q6q0EIcoZktQwjF8N9XGDS8Wuw
    in0UTtECgYEA+a3qeWIRY09U0awJxCVT4S7O9XcgbFgOTYXhzV+dnqkiSpX8DtUx
    J7JLGO0hlPiGCI0FYdZoxKwvuwTEM3gFh2q4FbZBMRkmNhtE4Te6NU5m1ZSPO3r2
    Hr6rkcmzN1GWWBJHPxjf9rYhaR6r3cPXJOfbcih3xqH50yPcJ92fVSMCgYEAzO2E
    ZJdTuRbuCyiwnb8sPBCaBQGV8SBPLhWVOwGnZFe9qldUcWHFLI2C/H+KdMJt0cfz
    hgj7lltXW9AuKzmxC+A35jkMwmWT+so7Io5b1zjtnS6a0Iz2+e0PZMonR/c6wznt
    QccMrJxdzUtUBSd0alVhdJqYQzrEPxIUaBDXE3kCgYEAmGmoBmzs/FiDCHMiiw/W
    QlHWmFUd/8VJBd3CVyIVD7NjcXBZK5zMotTdrtuiclO7TiD3th+yWMxbXqisNFcB
    2QY2VVqqNRSLFOBUjb789mljsOE9Biwrbd0q0pXzxsMRKbYOs9+1Z98KSick9v0D
    qk220dsOMrzRyifLzrIk/00CgYBnWBh+CfqEytV89yYqRzBtkgm6IJSXJy4HFYdO
    XIUoCz9w2d2R2DZxQ2QdJcyTGUH8mxNqMrl9l860VIYT8mIglRBbn8WZe1RnEvlD
    cftKzEC4FbqpFY2veCddMr0gg8M0lM/bbiAsJCcB0s0qVD1XKnudLCFBNi+lht6X
    pHZyMQKBgFNugi3RXS6f9fv+67cI29MRb1G6062a+5IjSqCy/qxmJVXB3GzSyTqr
    DtpoWUyIeZDrO81dPiF7JQNPcAXYw04p3LzoOii3ytY2RTJ9d5OSZLsfGbNjGqyu
    e54EZcfamyyBOWf4OiqgeTjAlhBn1qN7rTR3aB2k7f9IX+22s2Ms
    -----END RSA PRIVATE KEY-----
    EOD;

   
    $payload = array(
        "id" => $id,
        "ingreso" => (new DateTime())->getTimestamp()
    );

    $jwt = JWT::encode($payload, $privateKey, 'RS512');
    return $jwt;
}

function decifrarToken($token) {
    try {
       $publicKey = <<<EOD
        -----BEGIN PUBLIC KEY-----
        MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAx949+pTzEG0XycuWomlE
        d1OAkIzex1SdjTisYGsHXLY04kCpb9iStHWFH8ehjOqbBi6/KiTjq5dPg3lMuPEC
        nQvgfNKN8xDzs7rIRX7ZfQLbFAawg8B1U/ZPc4DIRVq0ueeeyWrpmGc7jgwT3vfG
        XrnSRbp9cJM4IYPOTL4KaEHcfHgElLXxr6plZtH5xbM5PyYX8XAYRjBspfuJg8Wi
        YsBrTlox5nMcu8XfJ9aaRMh78YWrHm+/xVUUmfL9ykV1knfd2k/ODEtrZEGff7qp
        H20yDUp8/RCNclGwPECl9272k+eTNEmkBn+uBoSi1l11ypY6r7Z3IBbtdmylRAXW
        iwIDAQAB
        -----END PUBLIC KEY-----
        EOD;
        $decoded = JWT::decode($token, $publicKey, array("RS512"));
        $decoded_array = (array) $decoded;
        return $decoded_array;    
    } catch (Exception $err) {
        //print_r($err);
        return "error";
    }
}

function generarTokenData($id) {

    $privateKey = <<<EOD
    -----BEGIN RSA PRIVATE KEY-----
    MIIEowIBAAKCAQEAx949+pTzEG0XycuWomlEd1OAkIzex1SdjTisYGsHXLY04kCp
    b9iStHWFH8ehjOqbBi6/KiTjq5dPg3lMuPECnQvgfNKN8xDzs7rIRX7ZfQLbFAaw
    g8B1U/ZPc4DIRVq0ueeeyWrpmGc7jgwT3vfGXrnSRbp9cJM4IYPOTL4KaEHcfHgE
    lLXxr6plZtH5xbM5PyYX8XAYRjBspfuJg8WiYsBrTlox5nMcu8XfJ9aaRMh78YWr
    Hm+/xVUUmfL9ykV1knfd2k/ODEtrZEGff7qpH20yDUp8/RCNclGwPECl9272k+eT
    NEmkBn+uBoSi1l11ypY6r7Z3IBbtdmylRAXWiwIDAQABAoIBACCON8RATNNJIc3R
    5qhvwyI4rMFe4M7RHpSpPZK6/EkCuNx9sduxCDxyxAtoJg1hDX1VUfgYaClEDUSa
    FoAtacKQ87EBTvPfuAJ3kzWWsvBk7bB2YnwjdjkF7u0edgCuBLAfZULjskcL0ayS
    lQ4Fh/9X/0MyXEphAIyc/paLggB3J9ku92XnJca+IYXCaA/bllzyvgEzJ5VtHawb
    5zjqgIud10p5HMM77SAcPXTKOx7oTqbEWu1C+tbb3dEgB8olRABoxsjT1XinxkJt
    YOM9R/CSX15AqIWVj+jlFjqy4OwidFxac8rgF0Q6q0EIcoZktQwjF8N9XGDS8Wuw
    in0UTtECgYEA+a3qeWIRY09U0awJxCVT4S7O9XcgbFgOTYXhzV+dnqkiSpX8DtUx
    J7JLGO0hlPiGCI0FYdZoxKwvuwTEM3gFh2q4FbZBMRkmNhtE4Te6NU5m1ZSPO3r2
    Hr6rkcmzN1GWWBJHPxjf9rYhaR6r3cPXJOfbcih3xqH50yPcJ92fVSMCgYEAzO2E
    ZJdTuRbuCyiwnb8sPBCaBQGV8SBPLhWVOwGnZFe9qldUcWHFLI2C/H+KdMJt0cfz
    hgj7lltXW9AuKzmxC+A35jkMwmWT+so7Io5b1zjtnS6a0Iz2+e0PZMonR/c6wznt
    QccMrJxdzUtUBSd0alVhdJqYQzrEPxIUaBDXE3kCgYEAmGmoBmzs/FiDCHMiiw/W
    QlHWmFUd/8VJBd3CVyIVD7NjcXBZK5zMotTdrtuiclO7TiD3th+yWMxbXqisNFcB
    2QY2VVqqNRSLFOBUjb789mljsOE9Biwrbd0q0pXzxsMRKbYOs9+1Z98KSick9v0D
    qk220dsOMrzRyifLzrIk/00CgYBnWBh+CfqEytV89yYqRzBtkgm6IJSXJy4HFYdO
    XIUoCz9w2d2R2DZxQ2QdJcyTGUH8mxNqMrl9l860VIYT8mIglRBbn8WZe1RnEvlD
    cftKzEC4FbqpFY2veCddMr0gg8M0lM/bbiAsJCcB0s0qVD1XKnudLCFBNi+lht6X
    pHZyMQKBgFNugi3RXS6f9fv+67cI29MRb1G6062a+5IjSqCy/qxmJVXB3GzSyTqr
    DtpoWUyIeZDrO81dPiF7JQNPcAXYw04p3LzoOii3ytY2RTJ9d5OSZLsfGbNjGqyu
    e54EZcfamyyBOWf4OiqgeTjAlhBn1qN7rTR3aB2k7f9IX+22s2Ms
    -----END RSA PRIVATE KEY-----
    EOD;

   
    $payload = $id;

    $jwt = JWT::encode($payload, $privateKey, 'RS512');
    return $jwt;
}




function validarToken($token, $id = "success") {
    try {
       $publicKey = <<<EOD
        -----BEGIN PUBLIC KEY-----
        MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAx949+pTzEG0XycuWomlE
        d1OAkIzex1SdjTisYGsHXLY04kCpb9iStHWFH8ehjOqbBi6/KiTjq5dPg3lMuPEC
        nQvgfNKN8xDzs7rIRX7ZfQLbFAawg8B1U/ZPc4DIRVq0ueeeyWrpmGc7jgwT3vfG
        XrnSRbp9cJM4IYPOTL4KaEHcfHgElLXxr6plZtH5xbM5PyYX8XAYRjBspfuJg8Wi
        YsBrTlox5nMcu8XfJ9aaRMh78YWrHm+/xVUUmfL9ykV1knfd2k/ODEtrZEGff7qp
        H20yDUp8/RCNclGwPECl9272k+eTNEmkBn+uBoSi1l11ypY6r7Z3IBbtdmylRAXW
        iwIDAQAB
        -----END PUBLIC KEY-----
        EOD;
        $decoded = JWT::decode($token, $publicKey, array("RS512"));
        $decoded_array = (array) $decoded;
        //print_r($id);
        /*if ($id == "1") {
            print_r($decoded_array);
        }*/
        if ($id != "success") {
            $time = (new DateTime())->getTimestamp();
            /*print_r("entro a success\n");*/
            if ($time- $decoded_array["ingreso"]*1 - (60*60*24) > 0) {
            //if ($time- $decoded_array["ingreso"]*1 - (60*60*0) > 0) {
                return "errorVencido";
            } else if ($decoded_array["id"] != $id) {
                return "error";
            } else if ($id == "2944") {
                return "errorVencido";
            }
            //print_r("envio error dentro de success\n");
            return $decoded_array["id"];
        } else {
            //print_r("no entro a success\n");
            return $decoded_array["id"];    
        }
    } catch (Exception $err) {
        //print_r($err);
        return "error";
    }
}


