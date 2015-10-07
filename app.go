package blaqbern

import (
  "net/http"
  "github.com/julienschmidt/httprouter"
  "html/template"
  "path"
  "log"
)

func index(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
  layout := path.Join("templates", "layout.html")
  page := path.Join("templates", r.URL.Path + ".html")

  t, err := template.ParseFiles(layout, page)
  if err != nil {
    log.Println(err.Error)
    return
  }

  t.Execute(w, nil)
}

func init() {
  log.Println("working?")
  router := httprouter.New()

  router.ServeFiles("/static/*filepath", http.Dir("static"))
  router.GET("/home", index)

  // appengine requires this call
  http.Handle("/", router)
}
