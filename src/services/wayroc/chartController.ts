// @ts-ignore
/* eslint-disable */
import { request } from "@umijs/max";

/** 此处后端没有提供注释 POST /chart/add */
export async function addChart(
  body: API.ChartAddRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseLong>("/api/chart/add", {
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
  return request<API.BaseResponseBoolean>("/api/chart/delete", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /chart/genchart */
export async function genChart(
  body: {
    req: string;
  },
  file?: File,
  options?: { [key: string]: any }
) {
  const formData = new FormData();

  if (file) {
    formData.append("file", file);
  }

  Object.keys(body).forEach((ele) => {
    const item = (body as any)[ele];

    if (item !== undefined && item !== null) {
      if (typeof item === "object" && !(item instanceof File)) {
        if (item instanceof Array) {
          item.forEach((f) => formData.append(ele, f || ""));
        } else {
          formData.append(
            ele,
            new Blob([JSON.stringify(item)], { type: "application/json" })
          );
        }
      } else {
        formData.append(ele, item);
      }
    }
  });

  return request<API.BaseResponseBiResponse>("/api/chart/genchart", {
    method: "POST",
    data: formData,
    requestType: "form",
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /chart/get */
export async function getChart(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getChartParams,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseChart>("/api/chart/get", {
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
  return request<API.BaseResponseObject>("/api/chart/list", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
