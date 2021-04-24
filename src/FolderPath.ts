import { findPathToFile } from "@j.u.p.iter/find-path-to-file";
import path from "path";

export class FolderPath {
  private appRootPath = null;

  /**
   * Detects the root path to the project by location of
   *   the "package.json" file internally.
   *
   */
  private async getAppRootFolderPath() {
    const { dirPath } = await findPathToFile("package.json");

    /**
     * Caches appRootPath not to recalculate
     *   it each time.
     *
     */
    this.appRootPath = dirPath;

    return this.appRootPath;
  }

  /**
   * If path is absolute, it should be correctly absolute.
   *   It means, that it should include complete location
   *   of the folder.
   */
  private async validatePath(pathToResolve) {
    const appRootFolderPath = await this.getAppRootFolderPath();

    if (!pathToResolve.includes(appRootFolderPath)) {
      throw new Error(
        "You are trying to resolve invalid path: /some-invalid/absolute/path."
      );
    }
  }

  /**
   * Resolves absolute or relative path to the folder
   *   (relative to the root folder) to the absolute path.
   *
   */
  public async resolve(pathToResolve: string) {
    if (path.isAbsolute(pathToResolve)) {
      try {
        await this.validatePath(pathToResolve);
      } catch (error) {
        throw error;
      }

      return pathToResolve;
    }

    const appRootFolderPath = await this.getAppRootFolderPath();
    return path.join(appRootFolderPath, pathToResolve);
  }
}
