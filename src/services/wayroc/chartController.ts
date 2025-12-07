// @ts-ignore
/* eslint-disable */
import { request } from "@umijs/max";

/** 此处后端没有提供注释 POST /chart/add */
export async function addChart(
  body: API.ChartAddRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseLong>("/chart/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /chart/delete */
export async function deleteChart(
  body: API.DeleteRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseBoolean>("/chart/delete", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /chart/get */
export async function getChart(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getChartParams,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseChart>("/chart/get", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /chart/list */
export async function listCharts(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listChartsParams,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseObject>("/chart/list", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
