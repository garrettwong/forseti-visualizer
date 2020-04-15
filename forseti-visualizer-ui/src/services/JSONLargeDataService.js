// Copyright 2020 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import * as d3 from 'd3';

class JSONLargeDataService {
    /**
     * @function constructor
     * @description sets the host.  the host is the URL to the backend api server
     */
    constructor() {
        this.cachedFileMap = {
            resourcesFile: 'dataset2_resources.json',
            violationsFile: 'dataset2_violations.json',
            iamexplainbyuserFile: 'dataset2_iamexplainbyuser.json',
        };
    }

    /**
     * @function getForsetiResources
     * @description gets forseti resources (for structure, reference ./forseti-visualizer-ui/public/dataset1_resources.json)
     * @return promise containing an array of forseti-resources
     */
    getForsetiResources() {
        return d3.json(this.cachedFileMap.resourcesFile);
    }

    /**
     * @function getViolations
     * @description based on the inventory_index_id, get all violations (during a scan)
     * @return promise containing an array of forseti-violations
     */
    getViolations() {
        return d3.json(this.cachedFileMap.violationsFile);
    }

    /**
     * @function getExplainIdentity
     * @description based on an iamPrefix, get all resources where the iamPrefixedResource has roles
     * @return promise containing an array of forseti-policies
     */
    getExplainIdentity() {
        return d3.json(this.cachedFileMap.iamexplainbyuserFile);
    }
}

export default JSONLargeDataService;