/* eslint-disable @typescript-eslint/no-explicit-any */
import { compact, groupBy } from 'lodash';

interface XmlNodeData {
  name: string;
  attributes: Record<string, string>;
  children: XmlNodeData[];
  value: string;
}

export interface AccomResponse {
  accomtype: string;
  code: string;
  Name: string;
  City: {
    code: string;
    value: string;
  };
  Distance: string;
  Category: string;
  GeoLocalization: {
    Latitude: string;
    Longitude: string;
  };
  Locations: string;
  PossibilitiesList: PossibilitiesItem[];
}

export interface PossibilitiesItem {
  suppliercode: string;
  onrequest: string;
  supplieraccomcode: string;
  currency: string;
  TotalPrice: {
    net: string;
    rack: string;
  };
  RoomPlans: RoomPlan[];
  Promotion: string;
  ShortDescription: string;
  ThumbnailUrl: string;
  MapUrl: string;
}

export interface RoomPlan {
  roomid: string;
  roomcount: string;
  roomtype: string;
  Refundable: string;
  RoomDescription: string;
  RoomPrice: {
    Total: {
      net: string;
      rack: string;
    };
    PerDay: {
      net: string;
      rack: string;
    };
  };
  NbAdults: string;
  NbChildren: string;
  NbCot: string;
  Board: Record<string, string>;
}

const singleNodeTransform = (node: XmlNodeData) => {
  const result: any = {
    ...node.attributes,
  };
  for (const child of node.children) {
    result[child.name] = transformMap[child.name]?.(child) || child.value;
  }
  return result;
};

const multipleNodeTransform = (node: XmlNodeData) => {
  const results: any[] = [];
  for (const child of node.children) {
    results.push(transformMap[child.name]?.(child) || child.value);
  }
  return results;
};

const transformMap: Record<string, (node: XmlNodeData) => any> = {
  ResAccomAvailability: (node: XmlNodeData) => {
    const result: any = {
      ...node.attributes,
    };
    const accomResponse: any[] = [];
    for (const child of node.children) {
      if (child.name === 'AccomResponse') {
        accomResponse.push(transformMap[child.name]?.(child));
      }
      result[child.name] = transformMap[child.name]?.(child) || child.value;
    }
    return { ...result, AccomResponse: compact(accomResponse) };
  },
  AccomResponse: (node: XmlNodeData) => singleNodeTransform(node),
  Distance: (node: XmlNodeData) => {
    return node.attributes['value'] + ' ' + node.attributes['unit'];
  },
  Category: (node: XmlNodeData) => {
    return node.attributes['code'];
  },
  City: (node: XmlNodeData) => {
    return {
      code: node.attributes['code'],
      value: node.value,
    };
  },
  GeoLocalization: (node: XmlNodeData) => {
    const result: Record<string, string> = {};
    for (const child of node.children) {
      result[child.name] = child.value;
    }
    return result;
  },
  PossibilitiesList: (node: XmlNodeData) => multipleNodeTransform(node),
  Possibility: (node: XmlNodeData) => {
    const result: any = {
      ...node.attributes,
    };
    for (const child of node.children) {
      result[child.name] = transformMap[child.name]?.(child) || child.value;
    }
    return result;
  },
  TotalPrice: (node: XmlNodeData) => {
    return {
      ...node.attributes,
    };
  },
  RoomPlans: (node: XmlNodeData) => multipleNodeTransform(node),
  RoomPlan: (node: XmlNodeData) => singleNodeTransform(node),
  RoomPrice: (node: XmlNodeData) => {
    const result: any = {};
    for (const child of node.children) {
      result[child.name] = child.attributes;
    }
    return result;
  },
  Board: (node: XmlNodeData) => {
    const result: Record<string, string> = {};
    if (!node.children.length) {
      return result;
    }
    const includedChildren = node.children[0].children;
    for (const child of includedChildren) {
      result[child.name] = child.value;
    }
    return result;
  },
};

export const transformXmlData = (rootNode: XmlNodeData) => {
  const result: any = {};
  const pendingNodes: XmlNodeData[] = [rootNode];
  while (pendingNodes.length) {
    const node = pendingNodes.pop();
    if (!node) {
      continue;
    }
    if (transformMap[node.name]) {
      result[node.name] = transformMap[node.name]?.(node);
      continue;
    } else {
      pendingNodes.push(...node.children);
    }
  }
  const accomResponseList = result['ResAccomAvailability'][
    'AccomResponse'
  ] as AccomResponse[];
  return groupBy(accomResponseList, (item) => item.City.code);
};
