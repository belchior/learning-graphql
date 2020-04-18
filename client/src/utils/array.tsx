import { CursorConnection } from 'utils/interfaces';

export const edgesToArray = (cursor: CursorConnection) => cursor.edges.map(item => item.node);
