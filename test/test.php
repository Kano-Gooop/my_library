<?php
namespace app\api\controller;

/**
 * aes 加密 解密类库
 * Class Aes
 * @package app\common\lib
 */
class Aes {

    private $key = null;
    private $iv = null;

    /**
     *
     * @param $key 		密钥
     * @return String
     */
    public function __construct() {
        // 需要小伙伴在配置文件app.php中定义aeskey
        $this->key = 'jIMSui6A6zsTu2m00qHGEQ==';
        $this->iv = 'x84mid1us3wwkvcu';
    }

    /**
     * 加密
     * @param String input 加密的字符串
     * @param String key   解密的key
     * @return HexString
     */
    public function encrypt($input = '') {
        $size = mcrypt_get_block_size(MCRYPT_RIJNDAEL_128, MCRYPT_MODE_CBC);
        $input = $this->addPKCS7Padding($input, $size);
        $td = mcrypt_module_open(MCRYPT_RIJNDAEL_128, '', MCRYPT_MODE_CBC, '');
        $iv = mcrypt_create_iv(mcrypt_enc_get_iv_size($td), MCRYPT_RAND);
//        mcrypt_generic_init($td, $this->key, $iv);
        mcrypt_generic_init($td, $this->key, $this->iv);

        $data = mcrypt_generic($td, $input);
        mcrypt_generic_deinit($td);
        mcrypt_module_close($td);
        $data = base64_encode($data);

        return $data;

    }
    /**
     * 填充方式 pkcs5
     * @param String text 		 原始字符串
     * @param String blocksize   加密长度
     * @return String
     */
    private function pkcs5_pad($text, $blocksize) {
        $pad = $blocksize - (strlen($text) % $blocksize);
        return $text . str_repeat(chr($pad), $pad);
    }

    protected function addPKCS7Padding($source)
    {
        $block = mcrypt_get_block_size(MCRYPT_RIJNDAEL_128, MCRYPT_MODE_CBC);

        $pad = $block - (strlen($source) % $block);

        $char = chr($pad);

        $source .= str_repeat($char, $pad);

        return $source;
    }

    /**
     * 解密
     * @param String input 解密的字符串
     * @param String key   解密的key
     * @return String
     */
    public function decrypt($sStr) {
        $decrypted= mcrypt_decrypt(MCRYPT_RIJNDAEL_128,$this->key,base64_decode($sStr), MCRYPT_MODE_ECB);
        $dec_s = strlen($decrypted);
        $padding = ord($decrypted[$dec_s-1]);
        $decrypted = substr($decrypted, 0, -$padding);

        return $decrypted;
    }
}

$aes = new Aes();

$arr = [
    'role' => 'admin',
    'loginName' => '18512280029',
    'name' => '18512280029',
    'timespan' => '1642133899'
];

$arr_str = json_encode($arr);
var_dump($arr_str);

$long = $aes->encrypt($arr_str);
var_dump($long);


