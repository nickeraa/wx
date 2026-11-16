-- 按寄卖单号查店铺编号与名称（签署详情页显示用）
CREATE OR REPLACE PROCEDURE espos.jmjm_order_shop (
  mycs      OUT SYS_REFCURSOR,
  v_orderno IN VARCHAR2
) AS
BEGIN
  OPEN mycs FOR
    SELECT o.SHOP_NO, s.xf_name AS SHOP_NAME
      FROM espos.JMJM_ORDER o
      LEFT JOIN xf_store s ON s.xf_storecode = o.SHOP_NO
     WHERE o.ORDER_NO = v_orderno;
END;
/
