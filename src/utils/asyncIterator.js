import { createWriteStream } from 'fs';
import { once } from 'events';
import { finished } from 'stream';

export async function writeFileIterator(iterable, filePath) {
  const controller = new AbortController();
  const writeStream = createWriteStream(filePath, { encoding: 'utf8' });
  try {
    for await (const chunk of iterable) {
      if (!writeStream.write(chunk)) {
        await once(writeFileIterator, 'drain', { signal: controller.signal });
      }
    }
    await finished(writeStream);
  } catch (err) {
    if (err.message === 'AbortError') {
      controller.abort();
      console.error('AbortError', { err });
    }
    console.error('UnknownError', { err });
  } finally {
    writeStream.end();
  }
}

export async function* createIterableStream(iterable) {
  while (true) {
    yield iterable;
  }
}
