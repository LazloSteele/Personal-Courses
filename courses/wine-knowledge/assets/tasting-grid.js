/* Tasting grid component. Rate each sample's structure, then check it.
 *
 * Markup:
 *   <div class="tgrid" data-id="l1" data-dials="Sweetness,Acidity,Tannin,Alcohol,Body"
 *        data-options="Lower,Same,Higher">
 *     <div class="tsample" data-name="Glass A" data-add="+ black tea bag"
 *          data-expect="Tannin=Higher;Body=Same|Higher"
 *          data-feedback="Text shown after checking."></div>
 *   </div>
 *
 * Dials not named in data-expect are expected to be the first "neutral" option
 * (data-neutral, default "Same"). Use | to accept more than one answer.
 */
(function () {
  function parseExpect(str) {
    var out = {};
    (str || "").split(";").forEach(function (pair) {
      var kv = pair.split("=");
      if (kv.length === 2) out[kv[0].trim()] = kv[1].split("|").map(function (s) { return s.trim(); });
    });
    return out;
  }

  function initGrid(grid, gi) {
    var dials = grid.dataset.dials.split(",");
    var options = grid.dataset.options.split(",");
    var neutral = grid.dataset.neutral || "Same";
    var gid = grid.dataset.id || "g" + gi;

    grid.querySelectorAll(".tsample").forEach(function (sample, si) {
      var expect = parseExpect(sample.dataset.expect);
      var h = document.createElement("h4");
      h.textContent = sample.dataset.name;
      sample.appendChild(h);
      if (sample.dataset.add) {
        var add = document.createElement("p");
        add.className = "add";
        add.textContent = sample.dataset.add;
        sample.appendChild(add);
      }

      var rows = dials.map(function (dial, di) {
        var row = document.createElement("div");
        row.className = "trow";
        var name = document.createElement("span");
        name.className = "dial";
        name.textContent = dial;
        var choices = document.createElement("div");
        choices.className = "tchoices";
        choices.setAttribute("role", "radiogroup");
        choices.setAttribute("aria-label", dial + " for " + sample.dataset.name);
        options.forEach(function (opt, oi) {
          var id = [gid, si, di, oi].join("-");
          var input = document.createElement("input");
          input.type = "radio";
          input.id = id;
          input.name = [gid, si, di].join("-");
          input.value = opt;
          var label = document.createElement("label");
          label.htmlFor = id;
          label.textContent = opt;
          choices.appendChild(input);
          choices.appendChild(label);
        });
        row.appendChild(name);
        row.appendChild(choices);
        sample.appendChild(row);
        return { dial: dial, row: row, accept: expect[dial] || [neutral] };
      });

      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "check";
      btn.textContent = "Check this glass";
      var fb = document.createElement("p");
      fb.className = "tfeedback";
      fb.setAttribute("aria-live", "polite");
      fb.hidden = true;
      sample.appendChild(btn);
      sample.appendChild(fb);

      btn.addEventListener("click", function () {
        var missing = 0, right = 0;
        rows.forEach(function (r) {
          var picked = r.row.querySelector("input:checked");
          r.row.classList.remove("ok", "off");
          if (!picked) { missing++; return; }
          var ok = r.accept.indexOf(picked.value) !== -1;
          r.row.classList.add(ok ? "ok" : "off");
          if (ok) right++;
        });
        fb.hidden = false;
        if (missing) {
          fb.textContent = "Rate all " + rows.length + " dials first (" + missing + " left).";
          return;
        }
        fb.textContent = right + " of " + rows.length + " match. " + (sample.dataset.feedback || "");
      });
    });
  }

  document.querySelectorAll(".tgrid").forEach(initGrid);
})();
