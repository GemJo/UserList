import type { AxiosPromise, AxiosRequestHeaders } from "axios";
import axios, {AxiosHeaders} from "axios";

const api: string = 'https://jsonplaceholder.typicode.com/';
interface Payload {}
export default abstract class RestAction {
  protected get(url: string, payload: Payload = {}): unknown {
    return this.doCall('GET', url, payload);
  }

  protected post(url: string, payload: Payload = {}): unknown {
    return this.doCall('POST', url, payload);
  }

  protected put(url: string, payload: Payload = {}): unknown {
    return this.doCall('PUT', url, payload);
  }

  protected delete(url: string, payload: Payload = {}): unknown {
    return this.doCall('DELETE', url, payload);
  }
  private doCall(
    method: string,
    url: string,
    payload: Payload,
    headers: AxiosRequestHeaders = new AxiosHeaders(),
  ): AxiosPromise {
    return axios({
      method,
      url: `${api}${url}`,
      data: payload,
      headers,
    }).then((response) =>  response.status >= 200 && response.status < 300 ? response.data : Promise.reject(response))
      .catch((error) => Promise.reject(error));
  }
}
