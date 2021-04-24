import { FolderPath } from '.';


describe('FolderPath', () => {
  describe('when pathToResolve is absolute', () => {
    describe('when path is not valid', () => {
      it('throws an appropriate error', async () => {
        const folderPath = new FolderPath();

        await expect(folderPath.resolve('/some-invalid/absolute/path')).rejects.toThrow('');
      });
    });
   
    describe('when path is valid', () => {
      it('returns a correct absolute path', async () => {
        const folderPath = new FolderPath();
        const resolvedPath = await folderPath.resolve(__dirname);

        expect(resolvedPath).toBe(__dirname);
      });
    });
  });

  describe('when pathToResolve is relative', () => {
    it('returns an absolute path', async () => {
      const folderPath = new FolderPath();
      const resolvedPath = await folderPath.resolve('./src');

      expect(resolvedPath).toBe(__dirname);
    });
  });
});
