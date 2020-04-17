import { CursorConnection } from 'utils/interfaces';

export const edgesToArray = (data: CursorConnection) => data.edges.map(item => item.node);
