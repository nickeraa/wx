-- =====================================================================
-- 金银币寄卖：员工店铺归属设定（员工在"店铺设定"页自选归属店铺）
-- 执行一次即可
-- =====================================================================

-- 1) 员工店铺归属表（每员工一条，重复设定即覆盖）
CREATE TABLE espos.JMJM_STAFF_SHOP (
  STAFF_ID   VARCHAR2(50)  NOT NULL,
  SHOP_NO    VARCHAR2(50)  NOT NULL,
  SHOP_NAME  VARCHAR2(200),
  UPD_TIME   DATE DEFAULT SYSDATE,
  CONSTRAINT PK_JMJM_STAFF_SHOP PRIMARY KEY (STAFF_ID)
);

-- 2) 保存归属（存在则更新，不存在则插入）
CREATE OR REPLACE PROCEDURE espos.jmjm_staff_shop_save (
  v_staffid  IN VARCHAR2,
  v_shopno   IN VARCHAR2,
  v_shopname IN VARCHAR2
) AS
BEGIN
  UPDATE espos.JMJM_STAFF_SHOP
     SET SHOP_NO = v_shopno, SHOP_NAME = v_shopname, UPD_TIME = SYSDATE
   WHERE STAFF_ID = v_staffid;
  IF SQL%ROWCOUNT = 0 THEN
    INSERT INTO espos.JMJM_STAFF_SHOP (STAFF_ID, SHOP_NO, SHOP_NAME, UPD_TIME)
    VALUES (v_staffid, v_shopno, v_shopname, SYSDATE);
  END IF;
  COMMIT;
END;
/

-- 3) 查当前归属（无记录返回空游标）
CREATE OR REPLACE PROCEDURE espos.jmjm_staff_shop_get (
  mycs     OUT SYS_REFCURSOR,
  v_staffid IN VARCHAR2
) AS
BEGIN
  OPEN mycs FOR
    SELECT STAFF_ID, SHOP_NO, SHOP_NAME, UPD_TIME
      FROM espos.JMJM_STAFF_SHOP
     WHERE STAFF_ID = v_staffid;
END;
/

-- 4) 在营寄卖店铺列表（店铺设定页下拉数据）
CREATE OR REPLACE PROCEDURE espos.jmjm_shop_list (
  mycs OUT SYS_REFCURSOR
) AS
BEGIN
  OPEN mycs FOR
    SELECT p.xf_storecode AS SHOP_NO, p.xf_name AS SHOP_NAME
      FROM xf_store p
     WHERE p.xf_active = '1' AND p.xf_type = '1'
     ORDER BY xf_storecode;
END;
/
