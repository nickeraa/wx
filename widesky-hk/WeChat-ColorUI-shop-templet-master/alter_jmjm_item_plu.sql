-- 寄卖货品货号（一物一码：数量多件的货品 PLU 存逗号分隔的多个货号）
-- 1) 明细表加货号列（已有 PLU 列时改为扩容语句）
-- ALTER TABLE espos.JMJM_ORDER_ITEM ADD (PLU VARCHAR2(50));
ALTER TABLE espos.JMJM_ORDER_ITEM MODIFY (PLU VARCHAR2(200));

-- 2) 重建明细写入存储过程（加 v_plu 参数，多货号逗号分隔）
CREATE OR REPLACE PROCEDURE espos.jmjm_item_ins (
  v_orderno   IN VARCHAR2,
  v_seq       IN NUMBER,
  v_imgpath   IN VARCHAR2,
  v_goodsname IN VARCHAR2,
  v_price     IN NUMBER,
  v_qty       IN NUMBER,
  v_plu       IN VARCHAR2
) AS
BEGIN
  INSERT INTO espos.JMJM_ORDER_ITEM
    (ORDER_NO, SEQ, IMG_PATH, GOODS_NAME, PRICE, QTY, PLU)
  VALUES
    (v_orderno, v_seq, v_imgpath, v_goodsname, v_price, v_qty, v_plu);
  COMMIT;
END;
/

-- 3) 合同查询存储过程加货号列（多件货品逗号合并，未填显示 -）
CREATE OR REPLACE PROCEDURE espos.jmjm_sign_list (
  mycs        OUT SYS_REFCURSOR,
  v_begindate IN VARCHAR2,
  v_enddate   IN VARCHAR2,
  v_orderno   IN VARCHAR2
) AS
BEGIN
  OPEN mycs FOR
    SELECT o.ORDER_NO, o.SHOP_NO, o.STAFF_ID, o.CUST_NAME, o.GOODS_NAME,
           o.PRICE, o.QTY,
           TO_CHAR(o.CREATE_TIME, 'YYYY-MM-DD HH24:MI') AS CREATE_TIME,
           TO_CHAR(o.SIGN_TIME, 'YYYY-MM-DD HH24:MI') AS SIGN_TIME,
           o.SIGN_URL,
           (SELECT LISTAGG(NVL(i.PLU, '-'), ',') WITHIN GROUP (ORDER BY i.SEQ)
              FROM espos.JMJM_ORDER_ITEM i
             WHERE i.ORDER_NO = o.ORDER_NO) AS PLU
      FROM espos.JMJM_ORDER o
     WHERE o.STATUS = 2
       AND (v_orderno IS NULL OR o.ORDER_NO LIKE '%' || v_orderno || '%')
       AND (v_begindate IS NULL OR o.SIGN_TIME >= TO_DATE(v_begindate, 'YYYY-MM-DD'))
       AND (v_enddate IS NULL OR o.SIGN_TIME < TO_DATE(v_enddate, 'YYYY-MM-DD') + 1)
     ORDER BY o.SIGN_TIME DESC;
END;
/

-- 4) 后台网页录入/修改货号（jmplu.aspx 保存用；v_plu 可为逗号分隔的多个货号）
CREATE OR REPLACE PROCEDURE espos.jmjm_item_updplu (
  v_orderno IN VARCHAR2,
  v_seq     IN NUMBER,
  v_plu     IN VARCHAR2
) AS
BEGIN
  UPDATE espos.JMJM_ORDER_ITEM
     SET PLU = v_plu
   WHERE ORDER_NO = v_orderno AND SEQ = v_seq;
  COMMIT;
END;
/

-- 5) 按寄卖单号查货品明细（jmplu.aspx 查询用）
CREATE OR REPLACE PROCEDURE espos.jmjm_item_list (
  mycs     OUT SYS_REFCURSOR,
  v_orderno IN VARCHAR2
) AS
BEGIN
  OPEN mycs FOR
    SELECT ORDER_NO, SEQ, GOODS_NAME, PRICE, QTY, NVL(PLU, ' ') AS PLU
      FROM espos.JMJM_ORDER_ITEM
     WHERE ORDER_NO = v_orderno
     ORDER BY SEQ;
END;
/

